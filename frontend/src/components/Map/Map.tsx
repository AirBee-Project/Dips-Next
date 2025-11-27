import { useEffect, useRef, useMemo } from "react";
import { Viewer, ImageryLayer, type CesiumComponentRef } from "resium";
import { Viewer as CesiumViewer, UrlTemplateImageryProvider } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import Time from "./Time";
import SettingButtons from "./SettingButtons";
import SettingMap from "./SettingMap";
import SettingTime from "./SettingTime";
import { useMap } from "../../context/Map";
import { ZXYTileMapList } from "../../data/ZXYTailMap";
import { attachClockListener } from "../../ulits/cesium/cesiumClockController";
import { drawVoxels, type SpaceTimeID } from "../../ulits/cesium/drawVoxels";
import * as Cesium from "cesium";

export default function Map() {
  const {
    sceneMode,
    tileId,
    viewerRef,
    mapVisible,
    setCurrentTime,
    setIsPaused,
  } = useMap();

  const isInitialized = useRef(false);

  // === タイルプロバイダ ===
  const osmProvider = useMemo(() => {
    return new UrlTemplateImageryProvider({
      url: ZXYTileMapList[tileId].XYZUrl,
      credit: ZXYTileMapList[tileId].credit,
      ...(ZXYTileMapList[tileId].maxZoomLevel !== undefined && {
        maximumLevel: ZXYTileMapList[tileId].maxZoomLevel,
      }),
    });
  }, [tileId]);

  // === Viewer初期化 ===
  const handleViewerRef = (ref: CesiumComponentRef<CesiumViewer> | null) => {
    if (!ref?.cesiumElement || isInitialized.current) return;

    const viewer = ref.cesiumElement;
    console.log("Viewer ready!");

    //ContextにViewerを格納
    viewerRef.current = viewer;
    attachClockListener(viewerRef, setCurrentTime, setIsPaused);

    isInitialized.current = true;

    // === デバッグ情報 ===
    console.log("Scene mode:", viewer.scene.mode);
    console.log("Camera position:", viewer.camera.position);
    console.log("Primitives collection:", viewer.scene.primitives.length);

    const voxels: SpaceTimeID[] = [];
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        voxels.push({ z: 3, f: 0, x: x, y: y });
        voxels.push({ z: 3, f: 1, x: x, y: y });
      }
    }

    drawVoxels(viewer, voxels);

    console.log("Primitives collection:", viewer.scene.primitives);
  };

  // === SceneMode変更 ===
  useEffect(() => {
    const viewer = viewerRef.current;
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
  }, [sceneMode, viewerRef]);

  return (
    <div className={`w-full h-full overflow-clip relative`}>
      <Viewer
        className="h-screen"
        ref={handleViewerRef}
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
        shouldAnimate={true}
      >
        <ImageryLayer imageryProvider={osmProvider} />
      </Viewer>

      {/* === UI コンポーネント群 === */}
      <div className="absolute bottom-8 left-1 z-11">
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
