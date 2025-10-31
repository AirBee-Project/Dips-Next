import React, { useMemo, useEffect, useRef } from "react";
import { Viewer, ImageryLayer, type CesiumComponentRef } from "resium";
import { Viewer as CesiumViewer, UrlTemplateImageryProvider } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

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
    <Viewer
      full
      ref={viewerRef}
      timeline={false}
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
  );
}
