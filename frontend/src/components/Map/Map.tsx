import { useEffect, useRef, useMemo } from "react";
import { Viewer, ImageryLayer, type CesiumComponentRef } from "resium";
import {
  Viewer as CesiumViewer,
  JulianDate,
  UrlTemplateImageryProvider,
  Math as CesiumMath,
  Cartesian3,
  Cartographic,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import Time from "./Time";
import SettingButtons from "./SettingButtons";
import SettingMap from "./SettingMap";
import SettingTime from "./SettingTime";
import { useMap } from "../../context/Map"; // ✅ Contextを利用
import { ZXYTileMapList } from "../../data/ZXYTailMapList";

export default function Map() {
  const {
    sceneMode,
    tileId,
    setCurrentTime,
    isPaused,
    timeSpeed,
    cameraView,
    setCameraView,
    viewerRef, // ✅ ここを追加！
  } = useMap();

  const localViewerRef = useRef<CesiumComponentRef<CesiumViewer>>(null);
  const isUpdatingFromCesium = useRef(false);
  const isInitialized = useRef(false);
  const lastUpdateTime = useRef(0);

  // === タイルプロバイダ ===
  const osmProvider = useMemo(() => {
    return new UrlTemplateImageryProvider({
      url: ZXYTileMapList[tileId].XYZUrl,
      credit: ZXYTileMapList[tileId].credit,
    });
  }, [tileId]);

  // === Viewer初期化 ===
  const handleViewerRef = (ref: CesiumComponentRef<CesiumViewer> | null) => {
    if (!ref?.cesiumElement || isInitialized.current) return;

    const viewer = ref.cesiumElement;
    console.log("Viewer ready!");

    // ✅ ContextにViewerを格納（これがポイント！）
    viewerRef.current = viewer;

    // BingMap削除
    viewer.imageryLayers.removeAll();

    // 初期カメラ位置設定
    const { longitude, latitude, height, heading, pitch, roll } = cameraView;
    viewer.camera.setView({
      destination: Cartesian3.fromDegrees(longitude, latitude, height),
      orientation: { heading, pitch, roll },
    });

    // カメラ変更イベント設定
    const updateCamera = () => {
      const now = Date.now();
      if (now - lastUpdateTime.current < 150) return;
      lastUpdateTime.current = now;

      const camera = viewer.camera;
      const pos = Cartographic.fromCartesian(camera.position);
      isUpdatingFromCesium.current = true;

      const newView = {
        longitude: CesiumMath.toDegrees(pos.longitude),
        latitude: CesiumMath.toDegrees(pos.latitude),
        height: pos.height,
        heading: camera.heading,
        pitch: camera.pitch,
        roll: camera.roll,
      };

      setCameraView(newView);
      setTimeout(() => (isUpdatingFromCesium.current = false), 100);
    };

    viewer.camera.changed.addEventListener(updateCamera);
    viewer.camera.moveEnd.addEventListener(updateCamera);

    isInitialized.current = true;
    console.log("Cesium initialization complete!");
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

  // === currentTime同期 ===
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    setCurrentTime(JulianDate.toDate(viewer.clock.currentTime));

    const interval = setInterval(() => {
      setCurrentTime(JulianDate.toDate(viewer.clock.currentTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [setCurrentTime, viewerRef]);

  // === 時間系 ===
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.clock.shouldAnimate = !isPaused;
    viewer.clock.multiplier = timeSpeed;
  }, [isPaused, timeSpeed, viewerRef]);

  // === Context → Cesium反映 ===
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !isInitialized.current || isUpdatingFromCesium.current)
      return;

    const { longitude, latitude, height, heading, pitch, roll } = cameraView;
    const pos = Cartographic.fromCartesian(viewer.camera.position);
    const lon = CesiumMath.toDegrees(pos.longitude);
    const lat = CesiumMath.toDegrees(pos.latitude);

    if (
      Math.abs(lon - longitude) < 0.001 &&
      Math.abs(lat - latitude) < 0.001 &&
      Math.abs(pos.height - height) < 10
    )
      return;

    viewer.camera.setView({
      destination: Cartesian3.fromDegrees(longitude, latitude, height),
      orientation: { heading, pitch, roll },
    });
  }, [cameraView, viewerRef]);

  return (
    <div className="w-full h-full overflow-clip relative">
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
