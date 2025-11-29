import { Cartesian3, Cartographic, Math as CesiumMath, Viewer } from "cesium";

/**
 *
 * @param viewer
 * @returns 視錐台を取得する
 */

export default function getCameraViewBounds(viewer: Viewer) {
  const camera = viewer.camera;

  // カメラ方向を取得
  const topLeft = camera.pickEllipsoid(new Cartesian3(0, 0))!;
  const bottomRight = camera.pickEllipsoid(
    new Cartesian3(window.innerWidth, window.innerHeight)
  )!;

  const topLeftCarto = Cartographic.fromCartesian(topLeft);
  const bottomRightCarto = Cartographic.fromCartesian(bottomRight);

  return {
    west: CesiumMath.toDegrees(topLeftCarto.longitude),
    north: CesiumMath.toDegrees(topLeftCarto.latitude),
    east: CesiumMath.toDegrees(bottomRightCarto.longitude),
    south: CesiumMath.toDegrees(bottomRightCarto.latitude),
  };
}
