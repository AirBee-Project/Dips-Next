// Map.tsx
import { useEffect, useRef, useMemo } from "react";
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
    setCurrentTime,
    isPaused,
    timeSpeed,
    currentTime,
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

  // 初期 currentTime を Cesium Clock から取得
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;
    setCurrentTime(JulianDate.toDate(viewer.clock.currentTime));
  }, []);

  // Clock tick の監視で React 側に同期
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    const interval = setInterval(() => {
      setCurrentTime(JulianDate.toDate(viewer.clock.currentTime));
    }, 1000); // 1秒に1回更新

    return () => clearInterval(interval);
  }, [setCurrentTime]);

  // isPaused / timeSpeed の変更反映
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    const clock = viewer.clock;
    clock.shouldAnimate = !isPaused;
    clock.multiplier = timeSpeed;
  }, [isPaused, timeSpeed]);

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
