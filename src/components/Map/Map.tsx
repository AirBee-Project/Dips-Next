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
import { useMap } from "../../context/Map";
import { ZXYTileMapList } from "../../data/ZXYTailMapList";
import SettingTime from "./SettingTime";
import { view } from "motion/react-client";

export default function Map() {
  //Mapの状態を取得する
  const { sceneMode, tileId, currentTime } = useMap();

  // ref の型を CesiumViewer にする
  const viewerRef = useRef<CesiumComponentRef<CesiumViewer>>(null);

  const osmProvider = useMemo(() => {
    return new UrlTemplateImageryProvider({
      url: ZXYTileMapList[tileId].XYZUrl,
      credit: ZXYTileMapList[tileId].credit,
    });
  }, [tileId]);

  // デフォルトのBingMapを削除
  useEffect(() => {
    if (viewerRef.current?.cesiumElement) {
      viewerRef.current.cesiumElement.imageryLayers.removeAll();
    }
  }, []);

  //描画の状態を変更
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

  //時間を設定
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;
    viewer.clock.currentTime = JulianDate.fromDate(currentTime);
    viewer?.timeline.container;
  }, [currentTime]);

  return (
    <div className="w-full h-full overflow-clip relative">
      <Viewer
        className="h-screen"
        animation={false}
        ref={viewerRef}
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

      {/* 時刻表示 */}
      <div className="absolute bottom-7 left-0 z-10">
        <Time />
      </div>

      {/* 地図の操作ボタン */}
      <div className="absolute bottom-10 right-3 z-10">
        <SettingButtons />
      </div>

      {/* 実際の地図の設定画面 */}
      <div className="absolute bottom-10 right-12 z-10 w-80">
        <SettingMap />
      </div>

      {/* 実際の時間の設定画面 */}
      <div className="absolute bottom-10 right-12 z-10 w-80">
        <SettingTime />
      </div>
    </div>
  );
}
