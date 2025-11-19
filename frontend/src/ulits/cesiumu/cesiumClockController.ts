// cesiumClockController.ts
import type { Viewer as CesiumViewer } from "cesium";
import * as Cesium from "cesium";

export const createCesiumClockController = (
  viewerRef: React.MutableRefObject<CesiumViewer | null>,
  setCurrentTime: (d: Date) => void,
  setTimeSpeed: (s: number) => void,
  setIsPaused: (p: boolean) => void
) => {
  const exists = () => viewerRef.current != null;

  const setCesiumTime = (date: Date) => {
    if (!exists()) return;
    viewerRef.current!.clock.currentTime = Cesium.JulianDate.fromDate(date);
  };

  const play = () => {
    if (!exists()) return;
    viewerRef.current!.clock.shouldAnimate = true;
    setIsPaused(false);
  };

  const pause = () => {
    if (!exists()) return;
    viewerRef.current!.clock.shouldAnimate = false;
    setIsPaused(true);
  };

  const setCesiumSpeed = (multiplier: number) => {
    if (!exists()) return;
    viewerRef.current!.clock.multiplier = multiplier;
    setTimeSpeed(multiplier);
  };

  const syncReactTimeToCesium = (date: Date) => {
    setCesiumTime(date);
  };

  const syncCesiumTimeToReact = () => {
    if (!exists()) return;
    const jd = viewerRef.current!.clock.currentTime;
    const jsDate = Cesium.JulianDate.toDate(jd);
    setCurrentTime(jsDate);
  };

  return {
    setCesiumTime,
    play,
    pause,
    setCesiumSpeed,
    syncReactTimeToCesium,
    syncCesiumTimeToReact,
  };
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

