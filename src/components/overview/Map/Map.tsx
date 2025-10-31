import React, { useMemo } from "react";
import { Viewer, ImageryLayer } from "resium";
import { UrlTemplateImageryProvider } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

export default function Map() {
  const osmProvider = useMemo(() => {
    return new UrlTemplateImageryProvider({
      url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
      credit: "", // 空にすると右下のCesiumロゴも消せる
    });
  }, []);

  return (
    <Viewer
      className="w-full"
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
