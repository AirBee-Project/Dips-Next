import { useMemo, useEffect, useRef } from "react";
import { Viewer, ImageryLayer, type CesiumComponentRef } from "resium";
import { Viewer as CesiumViewer, UrlTemplateImageryProvider } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import Time from "./Time";
import SettingButtons from "./SettingButtons";
import SettingMap from "./SettingMap";

export default function Map() {
  // ref の型を CesiumViewer にする
  const viewerRef = useRef<CesiumComponentRef<CesiumViewer>>(null);

  const osmProvider = useMemo(() => {
    return new UrlTemplateImageryProvider({
      url: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
      credit: "",
    });
  }, []);

  useEffect(() => {
    if (viewerRef.current?.cesiumElement) {
      // デフォルトのBingMapを削除
      viewerRef.current.cesiumElement.imageryLayers.removeAll();
    }
  }, []);

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
    </div>
  );
}
