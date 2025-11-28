import { useEffect, useRef, useMemo } from "react";
import { Viewer, ImageryLayer, type CesiumComponentRef } from "resium";
import {
  Viewer as CesiumViewer,
  Color,
  UrlTemplateImageryProvider,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import Time from "./Time";
import SettingButtons from "./SettingButtons";
import SettingMap from "./SettingMap";
import SettingTime from "./SettingTime";
import { useMap } from "../../context/Map";
import { ZXYTileMapList } from "../../data/ZXYTailMap";
import { attachClockListener } from "../../ulits/cesium/cesiumClockController";
import {
  useSpaceTimeID,
  type SpaceTimeIDCollection,
} from "../../context/SpaceTimeID";
import { drawMultipleVoxelCollections } from "../../ulits/cesium/drawVoxels";

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

  const { getVisibleCollections, addCollection } = useSpaceTimeID();

  useEffect(() => {
    if (!viewerRef.current) return;
    const visibleCollections = getVisibleCollections();
    drawMultipleVoxelCollections(viewerRef.current, visibleCollections);
  }, [getVisibleCollections]);

  // === SpaceTimeID描画 ===
  useEffect(() => {
    if (!viewerRef.current) return;
    const visibleCollections = getVisibleCollections();
    drawMultipleVoxelCollections(viewerRef.current, visibleCollections);
  }, [getVisibleCollections]);

  // === サンプルデータをContextに追加（テスト用） ===
  useEffect(() => {
    const sampleCollections: SpaceTimeIDCollection[] = [
      {
        id: "sample-1",
        spaceTimeIDs: [
          { z: 10, f: 5, x: 512, y: 512 },
          { z: 10, f: 5, x: 513, y: 512 },
          { z: 10, f: 5, x: 512, y: 513 },
        ],
        style: {
          color: Color.AZURE,
          alpha: 0.5,
          outlineColor: Color.BLACK,
        },
        visible: true,
      },
      {
        id: "sample-2",
        spaceTimeIDs: [
          { z: 10, f: 6, x: 513, y: 513 },
          { z: 10, f: 6, x: 514, y: 513 },
          { z: 10, f: 6, x: 513, y: 514 },
        ],
        style: {
          color: Color.BLUE,
          alpha: 0.6,
          outlineColor: Color.BLACK,
        },
        visible: true,
      },
      {
        id: "sample-3",
        spaceTimeIDs: [
          { z: 10, f: 7, x: 514, y: 512 },
          { z: 10, f: 7, x: 515, y: 512 },
          { z: 10, f: 7, x: 514, y: 514 },
        ],
        style: {
          color: Color.BLUE,
          alpha: 0.6,
          outlineColor: Color.BLACK,
        },
        visible: true,
      },
    ];

    sampleCollections.forEach((collection) => addCollection(collection));
  }, []);

  // === Viewer初期化 ===
  const handleViewerRef = (ref: CesiumComponentRef<CesiumViewer> | null) => {
    if (!ref?.cesiumElement || isInitialized.current) return;

    const viewer = ref.cesiumElement;
    console.log("Viewer ready!");

    //ContextにViewerを格納
    viewerRef.current = viewer;
    attachClockListener(viewerRef, setCurrentTime, setIsPaused);

    isInitialized.current = true;
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
