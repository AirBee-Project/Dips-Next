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

  // Context → Viewer の時間反映
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    const newJulian = JulianDate.fromDate(currentTime);
    if (!JulianDate.equals(newJulian, viewer.clock.currentTime)) {
      viewer.clock.currentTime = newJulian;
    }
  }, [currentTime]);

  // 時間を進める（自動再生）
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => new Date(prev.getTime() + 1000 * timeSpeed));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, timeSpeed, setCurrentTime]);

  // Viewer → Context 同期（タイムライン操作にも対応）
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    const handleTick = () => {
      const newDate = JulianDate.toDate(viewer.clock.currentTime);
      // 差分があるときだけ更新
      if (Math.abs(newDate.getTime() - currentTime.getTime()) > 1000) {
        setCurrentTime(newDate);
      }
    };

    viewer.clock.onTick.addEventListener(handleTick);

    return () => {
      viewer.clock.onTick.removeEventListener(handleTick);
    };
  }, [setCurrentTime, currentTime]);

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
