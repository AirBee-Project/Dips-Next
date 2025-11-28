import * as Cesium from "cesium";
import type {
  SpaceTimeID,
  SpaceTimeIDCollection,
} from "../../context/SpaceTimeID";

type Coordinates = {
  latitude: [number, number];
  longitude: [number, number];
  altitude: [number, number];
};

function longitude(x: number, n: number): number {
  return 360.0 * (x / n) - 180.0;
}

function latitude(y: number, n: number): number {
  const exponent = (1.0 - (2.0 * y) / n) * Math.PI;
  const lat_rad = 2.0 * Math.atan(1.0 - 2.0 / (Math.exp(exponent) + 1.0));
  return Cesium.Math.toDegrees(lat_rad);
}

function altitude(f: number, n: number): number {
  return 33_554_432 * (f / n);
}

function coordinates(spaceTime: SpaceTimeID): Coordinates {
  const n = 2 ** spaceTime.z;
  return {
    longitude: [longitude(spaceTime.x, n), longitude(spaceTime.x + 1, n)],
    latitude: [latitude(spaceTime.y, n), latitude(spaceTime.y + 1, n)],
    altitude: [altitude(spaceTime.f, n), altitude(spaceTime.f + 1, n)],
  };
}

function ellipsoidOffset(
  lon: number,
  lat: number,
  height: number
): Cesium.Cartesian3 {
  const ellipsoid = Cesium.Ellipsoid.WGS84;
  const surface = Cesium.Cartesian3.fromDegrees(lon, lat);
  const normal = ellipsoid.geodeticSurfaceNormal(surface);
  return Cesium.Cartesian3.add(
    surface,
    Cesium.Cartesian3.multiplyByScalar(normal, height, new Cesium.Cartesian3()),
    new Cesium.Cartesian3()
  );
}

function slerpCartesian3(
  start: Cesium.Cartesian3,
  end: Cesium.Cartesian3,
  t: number
): Cesium.Cartesian3 {
  const startNorm = Cesium.Cartesian3.normalize(start, new Cesium.Cartesian3());
  const endNorm = Cesium.Cartesian3.normalize(end, new Cesium.Cartesian3());

  const dot = Cesium.Cartesian3.dot(startNorm, endNorm);
  const theta = Math.acos(Math.min(Math.max(dot, -1.0), 1.0));

  if (theta < 1e-6) {
    return Cesium.Cartesian3.lerp(start, end, t, new Cesium.Cartesian3());
  }

  const sinTheta = Math.sin(theta);
  const factor1 = Math.sin((1 - t) * theta) / sinTheta;
  const factor2 = Math.sin(t * theta) / sinTheta;

  const part1 = Cesium.Cartesian3.multiplyByScalar(
    startNorm,
    factor1,
    new Cesium.Cartesian3()
  );
  const part2 = Cesium.Cartesian3.multiplyByScalar(
    endNorm,
    factor2,
    new Cesium.Cartesian3()
  );
  return Cesium.Cartesian3.add(part1, part2, new Cesium.Cartesian3());
}

function generateCurveOnEllipsoid(
  start: Cesium.Cartesian3,
  end: Cesium.Cartesian3,
  segments = 16
): Cesium.Cartesian3[] {
  const positions: Cesium.Cartesian3[] = [];
  const magStart = Cesium.Cartesian3.magnitude(start);
  const magEnd = Cesium.Cartesian3.magnitude(end);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const dir = slerpCartesian3(start, end, t);
    const h = magStart * (1 - t) + magEnd * t;
    positions.push(
      Cesium.Cartesian3.multiplyByScalar(
        Cesium.Cartesian3.normalize(dir, new Cesium.Cartesian3()),
        h,
        new Cesium.Cartesian3()
      )
    );
  }

  return positions;
}

export function drawVoxels(viewer: Cesium.Viewer, spaceTimeIDs: SpaceTimeID[]) {
  if (!spaceTimeIDs.length) return;

  const collections: SpaceTimeIDCollection[] = [
    {
      id: "default",
      spaceTimeIDs,
      style: {
        color: Cesium.Color.RED,
        alpha: 0.5,
        outlineColor: Cesium.Color.BLACK,
      },
      visible: true,
    },
  ];

  drawMultipleVoxelCollections(viewer, collections);
}

export function drawMultipleVoxelCollections(
  viewer: Cesium.Viewer,
  collections: SpaceTimeIDCollection[]
) {
  if (!collections.length) return;

  const voxelInstances: Cesium.GeometryInstance[] = [];
  const outlineInstances: Cesium.GeometryInstance[] = [];
  const positionsForCamera: Cesium.Cartesian3[] = [];

  for (const collection of collections) {
    const { color, alpha, outlineColor } = collection.style;
    const colorWithAlpha = color.withAlpha(alpha);

    for (const stid of collection.spaceTimeIDs) {
      const { latitude, longitude, altitude } = coordinates(stid);

      const latMin = latitude[0],
        latMax = latitude[1];
      const lonMin = longitude[0],
        lonMax = longitude[1];
      const altMin = altitude[0],
        altMax = altitude[1];

      const topPositions = [
        ellipsoidOffset(lonMin, latMin, altMax),
        ellipsoidOffset(lonMax, latMin, altMax),
        ellipsoidOffset(lonMax, latMax, altMax),
        ellipsoidOffset(lonMin, latMax, altMax),
      ];

      const bottomPositions = [
        ellipsoidOffset(lonMin, latMin, altMin),
        ellipsoidOffset(lonMax, latMin, altMin),
        ellipsoidOffset(lonMax, latMax, altMin),
        ellipsoidOffset(lonMin, latMax, altMin),
      ];

      positionsForCamera.push(...topPositions, ...bottomPositions);

      // ボクセル本体
      voxelInstances.push(
        new Cesium.GeometryInstance({
          geometry: new Cesium.PolygonGeometry({
            polygonHierarchy: new Cesium.PolygonHierarchy(topPositions),
            perPositionHeight: true,
            extrudedHeight: altMin,
          }),
          attributes: {
            color:
              Cesium.ColorGeometryInstanceAttribute.fromColor(colorWithAlpha),
          },
          id: `${collection.id}/${stid.z}/${stid.x}/${stid.y}/${stid.f}`,
        })
      );

      // アウトライン
      for (let i = 0; i < 4; i++) {
        const next = (i + 1) % 4;

        // 上面
        outlineInstances.push(
          new Cesium.GeometryInstance({
            geometry: new Cesium.PolylineGeometry({
              positions: generateCurveOnEllipsoid(
                topPositions[i],
                topPositions[next],
                16
              ),
              width: 2,
            }),
            attributes: {
              color:
                Cesium.ColorGeometryInstanceAttribute.fromColor(outlineColor),
            },
          })
        );

        // 底面
        outlineInstances.push(
          new Cesium.GeometryInstance({
            geometry: new Cesium.PolylineGeometry({
              positions: generateCurveOnEllipsoid(
                bottomPositions[i],
                bottomPositions[next],
                16
              ),
              width: 2,
            }),
            attributes: {
              color:
                Cesium.ColorGeometryInstanceAttribute.fromColor(outlineColor),
            },
          })
        );

        // 垂直（側面）
        outlineInstances.push(
          new Cesium.GeometryInstance({
            geometry: new Cesium.PolylineGeometry({
              positions: generateCurveOnEllipsoid(
                bottomPositions[i],
                topPositions[i],
                16
              ),
              width: 2,
            }),
            attributes: {
              color:
                Cesium.ColorGeometryInstanceAttribute.fromColor(outlineColor),
            },
          })
        );
      }
    }
  }

  // 描画
  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: voxelInstances,
      appearance: new Cesium.PerInstanceColorAppearance({
        flat: true,
        translucent: true,
        closed: false,
      }),
    })
  );

  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: outlineInstances,
      appearance: new Cesium.PolylineColorAppearance({ translucent: false }),
    })
  );
}
