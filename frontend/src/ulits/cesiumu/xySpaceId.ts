import type { Viewer } from "cesium";
import getCameraViewBounds from "./getCameraViewBounds";

/**
 * @param {Viewer} viewer
 * @param {string} z 描画する空間IDのズームレベル
 *
 * 与えられた`Viewer`に対して2次元の空間IDを平面で描画する。
 */

export default function xySpaceId(viewer: Viewer, z: number) {
  let test: ReturnType<typeof getCameraViewBounds> | undefined;

  try {
    test = getCameraViewBounds(viewer);
  } catch (e) {
    console.error("Failed to get camera bounds:", e);
  }

  if (!test) return;

  console.log("Camera bounds:", test);

  // ここでzレベルに応じたタイル番号計算など
  // 例: tiles = calculateTilesFromBounds(test, z)
}
