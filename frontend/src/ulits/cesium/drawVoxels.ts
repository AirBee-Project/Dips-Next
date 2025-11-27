import * as Cesium from "cesium";

export type SpaceTimeID = {
  z: number;
  f: number;
  x: number;
  y: number;
  t_start?: number;
  t_end?: number;
};

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

export function drawVoxels(viewer: Cesium.Viewer, spaceTimeIDs: SpaceTimeID[]) {
  if (!spaceTimeIDs.length) return;

  const voxelInstances: Cesium.GeometryInstance[] = [];
  const outlineInstances: Cesium.GeometryInstance[] = [];
  const positionsForCamera: Cesium.Cartesian3[] = [];

  for (const stid of spaceTimeIDs) {
    const { latitude, longitude, altitude } = coordinates(stid);

    const latMin = latitude[0],
      latMax = latitude[1];
    const lonMin = longitude[0],
      lonMax = longitude[1];
    const altMin = altitude[0],
      altMax = altitude[1];

    const topPositions = [
      Cesium.Cartesian3.fromDegrees(lonMin, latMin, altMax),
      Cesium.Cartesian3.fromDegrees(lonMax, latMin, altMax),
      Cesium.Cartesian3.fromDegrees(lonMax, latMax, altMax),
      Cesium.Cartesian3.fromDegrees(lonMin, latMax, altMax),
    ];

    const bottomPositions = [
      Cesium.Cartesian3.fromDegrees(lonMin, latMin, altMin),
      Cesium.Cartesian3.fromDegrees(lonMax, latMin, altMin),
      Cesium.Cartesian3.fromDegrees(lonMax, latMax, altMin),
      Cesium.Cartesian3.fromDegrees(lonMin, latMax, altMin),
    ];

    positionsForCamera.push(...topPositions, ...bottomPositions);

    // *** 本体（側面＋底面を自動生成） ***
    voxelInstances.push(
      new Cesium.GeometryInstance({
        geometry: new Cesium.PolygonGeometry({
          polygonHierarchy: new Cesium.PolygonHierarchy(topPositions),
          perPositionHeight: true,
          extrudedHeight: altMin,
        }),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.RED.withAlpha(0.5)
          ),
        },
        id: `${stid.z}/${stid.x}/${stid.y}/${stid.f}`,
      })
    );

    // *** 全面アウトライン ***
    for (let i = 0; i < 4; i++) {
      const next = (i + 1) % 4;

      // 上面
      outlineInstances.push(
        new Cesium.GeometryInstance({
          geometry: new Cesium.PolylineGeometry({
            positions: [topPositions[i], topPositions[next]],
            width: 2,
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(
              Cesium.Color.BLACK
            ),
          },
        })
      );

      // 底面
      outlineInstances.push(
        new Cesium.GeometryInstance({
          geometry: new Cesium.PolylineGeometry({
            positions: [bottomPositions[i], bottomPositions[next]],
            width: 2,
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(
              Cesium.Color.BLACK
            ),
          },
        })
      );

      // 垂直
      outlineInstances.push(
        new Cesium.GeometryInstance({
          geometry: new Cesium.PolylineGeometry({
            positions: [bottomPositions[i], topPositions[i]],
            width: 2,
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(
              Cesium.Color.BLACK
            ),
          },
        })
      );
    }
  }

  // ************ 描画 ************

  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: voxelInstances,
      appearance: new Cesium.PerInstanceColorAppearance({
        flat: true,
        translucent: true,
        closed: false, // ← 全面透明になる重要設定
      }),
    })
  );

  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: outlineInstances,
      appearance: new Cesium.PolylineColorAppearance({ translucent: false }),
    })
  );

  // ************ カメラ調整 ************
  if (positionsForCamera.length > 0) {
    const boundingSphere = Cesium.BoundingSphere.fromPoints(positionsForCamera);
    viewer.camera.viewBoundingSphere(
      boundingSphere,
      new Cesium.HeadingPitchRange(
        viewer.camera.heading,
        -Cesium.Math.PI_OVER_FOUR,
        0
      )
    );
  }
}
