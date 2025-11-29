import type { Viewer as CesiumViewer } from "cesium";
import * as Cesium from "cesium";

/**
 * Cesium の時計アニメーションを再生する。
 * @param viewerRef - Cesium Viewer インスタンスを保持する React の mutable ref
 * @returns ビューアが存在しない、または破棄済みの場合は null
 */
export const playCesiumTime = (viewerRef: React.MutableRefObject<CesiumViewer | null>) => {
  if (!viewerRef.current || viewerRef.current.isDestroyed()) return null;
  viewerRef.current.clock.shouldAnimate = true;
};

/**
 * Cesium の時計アニメーションを停止する。
 * @param viewerRef - Cesium Viewer インスタンスを保持する React の mutable ref
 * @returns ビューアが存在しない、または破棄済みの場合は null
 */
export const pauseCesiumTime = (viewerRef: React.MutableRefObject<CesiumViewer | null>) => {
  if (!viewerRef.current || viewerRef.current.isDestroyed()) return null;
  viewerRef.current.clock.shouldAnimate = false;
};

/**
 * Cesium の時計の速度を変更する。
 * @param viewerRef - Cesium Viewer インスタンスを保持する React の mutable ref
 * @param multiplier - 時計の速度倍率（例: 1 = 通常速度、2 = 2倍速）
 * @returns ビューアが存在しない、または破棄済みの場合は null
 */
export const setCesiumSpeed = (
  viewerRef: React.MutableRefObject<CesiumViewer | null>,
  multiplier: number
) => {
  if (!viewerRef.current || viewerRef.current.isDestroyed()) return null;
  viewerRef.current.clock.multiplier = multiplier;
};

/**
 * Cesium の時計の tick イベントにリスナーを追加し、React state を更新する。
 * @param viewerRef - Cesium Viewer インスタンスを保持する React の mutable ref
 * @param setCurrentTime - 現在時刻を React state に反映するコールバック関数
 * @param setIsPaused - 一時停止状態を React state に反映するコールバック関数
 */
export const attachClockListener = (
  viewerRef: React.MutableRefObject<CesiumViewer | null>,
  setCurrentTime: (d: Date) => void,
  setIsPaused: (p: boolean) => void
) => {
  const viewer = viewerRef.current;
  if (!viewer) return;

  viewer.clock.onTick.addEventListener(() => {
    const jd = viewer.clock.currentTime;
    const jsDate = Cesium.JulianDate.toDate(jd);
    setCurrentTime(jsDate);

    setIsPaused(!viewer.clock.shouldAnimate);
  });
};
