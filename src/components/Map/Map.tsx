// Map.tsx
import { useMemo, useEffect, useRef } from "react";
import { Viewer, ImageryLayer, type CesiumComponentRef } from "resium";
import {
  Viewer as CesiumViewer,
  JulianDate,
  UrlTemplateImageryProvider,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import Time from "./Time";
import SettingButtons from "./SettingButtons";
import SettingMap from "./SettingMap";
import SettingTime from "./SettingTime";
import { useMap } from "../../context/Map";
import { ZXYTileMapList } from "../../data/ZXYTailMapList";

export default function Map() {
  const {
    sceneMode,
    tileId,
    currentTime,
    isPaused,
    setCurrentTime,
    timeSpeed,
    setIsPaused,
  } = useMap();

  const viewerRef = useRef<CesiumComponentRef<CesiumViewer>>(null);

  const osmProvider = useMemo(() => {
    return new UrlTemplateImageryProvider({
      url: ZXYTileMapList[tileId].XYZUrl,
      credit: ZXYTileMapList[tileId].credit,
    });
  }, [tileId]);

  // BingMap削除
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (viewer) viewer.imageryLayers.removeAll();
  }, []);

  // SceneMode変更
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    const duration = 1;
    switch (sceneMode) {
      case "2D":
        viewer.scene.morphTo2D(duration);
        break;
      case "3D":
        viewer.scene.morphTo3D(duration);
        break;
      case "Columbus":
        viewer.scene.morphToColumbusView(duration);
        break;
    }
  }, [sceneMode]);

  // Cesium Clock 制御: currentTime / isPaused / timeSpeed 同期
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    const clock = viewer.clock;

    // 初回でも必ず現在時刻・再生状態・速度を設定
    clock.startTime = JulianDate.fromDate(currentTime);
    clock.currentTime = JulianDate.fromDate(currentTime);
    clock.shouldAnimate = !isPaused;
    clock.multiplier = timeSpeed;

    // タイムライン操作や時計更新を React 側に同期
    const handleTick = () => {
      const newDate = JulianDate.toDate(clock.currentTime);
      setCurrentTime(newDate);
    };

    clock.onTick.addEventListener(handleTick);

    return () => {
      clock.onTick.removeEventListener(handleTick);
    };
  }, [currentTime]);

  return (
    <div className="w-full h-full overflow-clip relative">
      <Viewer
        className="h-screen"
        ref={viewerRef}
        timeline={true}
        animation={false}
        baseLayerPicker={false}
        geocoder={false}
        homeButton={false}
        infoBox={false}
        sceneModePicker={false}
        navigationHelpButton={false}
        fullscreenButton={false}
        vrButton={false}
      >
        <ImageryLayer imageryProvider={osmProvider} />
      </Viewer>

      <div className="absolute bottom-7 left-0 z-10">
        <Time />
      </div>

      <div className="absolute bottom-10 right-3 z-10">
        <SettingButtons />
      </div>

      <div className="absolute bottom-10 right-12 z-10 w-80">
        <SettingMap />
      </div>

      <div className="absolute bottom-10 right-12 z-10 w-80">
        <SettingTime />
      </div>
    </div>
  );
}
