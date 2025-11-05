import { Viewer, Cartesian3, EasingFunction, Math as CesiumMath } from "cesium";

/**
 * アニメーション付きズームイン
 * @param viewer Cesium Viewer インスタンス
 * @param distance 移動距離（メートル, 正の値で前進）
 * @param duration アニメーション時間（秒）
 */
export function zoomInAnimated(
  viewer: Viewer | null | undefined,
  distance: number = 1000,
  duration: number = 0.6
): void {
  if (!viewer || viewer.isDestroyed()) return;

  const camera = viewer.camera;
  const startPos = camera.positionWC.clone();
  const direction = camera.directionWC.clone();

  // 前方向へ移動
  const endPos = Cartesian3.add(
    startPos,
    Cartesian3.multiplyByScalar(direction, distance, new Cartesian3()),
    new Cartesian3()
  );

  camera.flyTo({
    destination: endPos,
    orientation: {
      heading: camera.heading,
      pitch: camera.pitch,
      roll: camera.roll,
    },
    duration,
    easingFunction: EasingFunction.QUADRATIC_IN_OUT,
  });
}

/**
 * アニメーション付きズームアウト
 * @param viewer Cesium Viewer インスタンス
 * @param distance 移動距離（メートル, 正の値で後退）
 * @param duration アニメーション時間（秒）
 */
export function zoomOutAnimated(
  viewer: Viewer | null | undefined,
  distance: number = 1000,
  duration: number = 0.6
): void {
  if (!viewer || viewer.isDestroyed()) return;

  const camera = viewer.camera;
  const startPos = camera.positionWC.clone();
  const direction = camera.directionWC.clone();

  // 後方向へ移動
  const endPos = Cartesian3.add(
    startPos,
    Cartesian3.multiplyByScalar(direction, -distance, new Cartesian3()),
    new Cartesian3()
  );

  camera.flyTo({
    destination: endPos,
    orientation: {
      heading: camera.heading,
      pitch: camera.pitch,
      roll: camera.roll,
    },
    duration,
    easingFunction: EasingFunction.QUADRATIC_IN_OUT,
  });
}
