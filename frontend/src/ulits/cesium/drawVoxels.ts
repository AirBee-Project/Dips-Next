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

/**
 * WGS84楕円体上の2点間の距離をハバーサイン公式で計算
 * @param lat1 緯度1（度）
 * @param lon1 経度1（度）
 * @param lat2 緯度2（度）
 * @param lon2 経度2（度）
 * @returns 距離（メートル）
 */
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371008.8; // WGS84地球半径（メートル）
  const dLat = Cesium.Math.toRadians(lat2 - lat1);
  const dLon = Cesium.Math.toRadians(lon2 - lon1);
  const lat1_rad = Cesium.Math.toRadians(lat1);
  const lat2_rad = Cesium.Math.toRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1_rad) *
      Math.cos(lat2_rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * ボクセルのボックスサイズを高精度で計算
 * @param coords ボクセルの座標範囲
 * @returns East-North-Up座標系でのボックスサイズ
 */
function getBoxDimensionsWithPrecision(coords: Coordinates): Cesium.Cartesian3 {
  // 中心緯度経度を計算
  const latMin = coords.latitude[0];
  const latMax = coords.latitude[1];
  const lonMin = coords.longitude[0];
  const lonMax = coords.longitude[1];

  const latCenter = (latMin + latMax) / 2;
  const lonCenter = (lonMin + lonMax) / 2;

  // 南北方向の距離（中央経度で計算）
  const northDist = haversineDistance(latMin, lonCenter, latMax, lonCenter);

  // 東西方向の距離（中央緯度で計算）
  const eastDist = haversineDistance(latCenter, lonMin, latCenter, lonMax);

  // 高度差
  const altDelta = coords.altitude[1] - coords.altitude[0];

  // East-North-Up座標系のボックスサイズ
  return new Cesium.Cartesian3(
    eastDist, // 東西方向
    northDist, // 南北方向
    altDelta // 上下方向
  );
}

export function drawVoxels(viewer: Cesium.Viewer, spaceTimeIDs: SpaceTimeID[]) {
  if (!spaceTimeIDs.length) return;

  const boxInstances: Cesium.GeometryInstance[] = [];
  const outlineInstances: Cesium.GeometryInstance[] = [];
  const positions: Cesium.Cartesian3[] = [];

  for (const stid of spaceTimeIDs) {
    const coords = coordinates(stid);
    const lonCenter = (coords.longitude[0] + coords.longitude[1]) / 2;
    const latCenter = (coords.latitude[0] + coords.latitude[1]) / 2;
    const altCenter = (coords.altitude[0] + coords.altitude[1]) / 2;

    const position = Cesium.Cartesian3.fromDegrees(
      lonCenter,
      latCenter,
      altCenter
    );
    positions.push(position);

    const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);

    // 高精度なボックスサイズを計算
    const boxDimensions = getBoxDimensionsWithPrecision(coords);

    // 赤いボックス
    boxInstances.push(
      new Cesium.GeometryInstance({
        geometry: Cesium.BoxGeometry.fromDimensions({
          dimensions: boxDimensions,
        }),
        modelMatrix,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.RED
          ),
        },
        id: `${stid.z}/${stid.x}/${stid.y}/${stid.f}`,
      })
    );

    // 黒いアウトライン
    outlineInstances.push(
      new Cesium.GeometryInstance({
        geometry: Cesium.BoxOutlineGeometry.fromDimensions({
          dimensions: boxDimensions,
        }),
        modelMatrix,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.BLACK
          ),
        },
        id: `${stid.z}/${stid.x}/${stid.y}/${stid.f}-outline`,
      })
    );
  }

  // 赤ボックス用 Primitive
  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: boxInstances,
      appearance: new Cesium.PerInstanceColorAppearance({
        flat: true,
        translucent: false,
        closed: true,
      }),
      releaseGeometryInstances: false,
    })
  );

  // アウトライン用 Primitive
  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: outlineInstances,
      appearance: new Cesium.PerInstanceColorAppearance({
        flat: true,
        translucent: false,
      }),
      releaseGeometryInstances: false,
    })
  );

  // --- カメラを全ボクセルが見える位置に調整 ---
  if (positions.length > 0) {
    let minX = positions[0].x,
      maxX = positions[0].x;
    let minY = positions[0].y,
      maxY = positions[0].y;
    let minZ = positions[0].z,
      maxZ = positions[0].z;

    for (const pos of positions) {
      minX = Math.min(minX, pos.x);
      maxX = Math.max(maxX, pos.x);
      minY = Math.min(minY, pos.y);
      maxY = Math.max(maxY, pos.y);
      minZ = Math.min(minZ, pos.z);
      maxZ = Math.max(maxZ, pos.z);
    }

    const center = new Cesium.Cartesian3(
      (minX + maxX) / 2,
      (minY + maxY) / 2,
      (minZ + maxZ) / 2
    );
    const radius = Math.max(maxX - minX, maxY - minY, maxZ - minZ) / 2;

    const boundingSphere = new Cesium.BoundingSphere(center, radius * 2);
    viewer.camera.viewBoundingSphere(
      boundingSphere,
      new Cesium.HeadingPitchRange(0, -Cesium.Math.PI_OVER_FOUR, 0)
    );
  }
}
