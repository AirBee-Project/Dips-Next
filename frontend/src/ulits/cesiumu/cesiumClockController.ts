// cesiumClockController.ts
import type { Viewer as CesiumViewer } from "cesium";
import * as Cesium from "cesium";

export const playCesiumTime = (viewerRef: React.MutableRefObject<CesiumViewer | null>) => {
  if (!viewerRef.current || viewerRef.current.isDestroyed())
    return null;
  viewerRef.current!.clock.shouldAnimate = true;
};

export const pauseCesiumTime = (viewerRef: React.MutableRefObject<CesiumViewer | null>) => {
  if (!viewerRef.current || viewerRef.current.isDestroyed())
    return null;
  viewerRef.current!.clock.shouldAnimate = false;
};

export const setCesiumSpeed = (
  viewerRef: React.MutableRefObject<CesiumViewer | null>,
  multiplier: number) => {
  if (!viewerRef.current || viewerRef.current.isDestroyed())
    return null;
  viewerRef.current!.clock.multiplier = multiplier;
};

// Viewer初期化時に追加するリスナー
export const attachClockListener = (
  viewerRef: React.MutableRefObject<CesiumViewer | null>,
  setCurrentTime: (d: Date) => void,
  setIsPaused: (p: boolean) => void) => {
  const viewer = viewerRef.current;
  if (!viewer) return;

  viewer.clock.onTick.addEventListener(() => {
    const jd = viewerRef.current!.clock.currentTime;
    const jsDate = Cesium.JulianDate.toDate(jd);
    setCurrentTime(jsDate);

    const paused = !viewer.clock.shouldAnimate;
    setIsPaused(paused);
  });
};

