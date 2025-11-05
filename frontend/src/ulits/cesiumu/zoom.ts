import { Viewer, Cartesian3, EasingFunction, Math as CesiumMath } from "cesium";

export function zoomInAdaptive(viewer: Viewer, currentHeight: number) {
  // 高度に応じた移動量（例: 現在の高さの30%）
  const moveAmount = currentHeight * 0.3;
  const newHeight = Math.max(currentHeight - moveAmount, 50); // 下限50m

  const carto = viewer.camera.positionCartographic;
  viewer.camera.flyTo({
    destination: Cartesian3.fromRadians(
      carto.longitude,
      carto.latitude,
      newHeight
    ),
    duration: 0.5,
    easingFunction: EasingFunction.QUADRATIC_IN_OUT,
  });
}

/**
 * 高度に応じてズームアウト
 */
export function zoomOutAdaptive(viewer: Viewer, currentHeight: number) {
  const moveAmount = currentHeight * 1.5;
  const newHeight = Math.min(currentHeight + moveAmount, 500000000); // 上限50000m

  const carto = viewer.camera.positionCartographic;
  viewer.camera.flyTo({
    destination: Cartesian3.fromRadians(
      carto.longitude,
      carto.latitude,
      newHeight
    ),
    duration: 0.5,
    easingFunction: EasingFunction.QUADRATIC_IN_OUT,
  });
}
