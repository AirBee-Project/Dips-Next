// Map.tsx
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
import { useMap } from "../../context/Map";
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
  } = useMap();

  const viewerRef = useRef<CesiumComponentRef<CesiumViewer>>(null);
  const isUpdatingFromCesium = useRef(false);
  const isInitialized = useRef(false);
  const lastUpdateTime = useRef(0); // 最後の更新時刻

  // === タイルプロバイダ ===
  const osmProvider = useMemo(() => {
    return new UrlTemplateImageryProvider({
      url: ZXYTileMapList[tileId].XYZUrl,
      credit: ZXYTileMapList[tileId].credit,
    });
  }, [tileId]);

  // === Viewerのrefコールバック（初期化処理） ===
  const handleViewerRef = (ref: CesiumComponentRef<CesiumViewer> | null) => {
    console.log("handleViewerRef called, ref:", ref);

    if (!ref || !ref.cesiumElement) {
      console.log("Ref or cesiumElement is null");
      return;
    }

    if (isInitialized.current) {
      console.log("Already initialized");
      return;
    }

    const viewer = ref.cesiumElement;
    console.log("Viewer ready! Initializing...");

    // BingMap削除
    viewer.imageryLayers.removeAll();
    console.log("BingMap removed");

    // 初期カメラ位置を設定
    const { longitude, latitude, height, heading, pitch, roll } = cameraView;

    console.log("Setting initial camera position:", {
      longitude,
      latitude,
      height,
      heading,
      pitch,
      roll,
    });

    viewer.camera.setView({
      destination: Cartesian3.fromDegrees(longitude, latitude, height),
      orientation: { heading, pitch, roll },
    });

    // refも保存
    viewerRef.current = ref;

    // カメラ移動イベントリスナーを設定（リアルタイム同期）
    const updateCamera = () => {
      const now = Date.now();

      // 100ms以内の更新は間引く（パフォーマンス対策）
      if (now - lastUpdateTime.current < 150) {
        return;
      }

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

      console.log("Camera updated from Cesium:", newView);
      setCameraView(newView);

      setTimeout(() => {
        isUpdatingFromCesium.current = false;
      }, 100);
    };

    // camera.changed: カメラが動いている最中も発火
    viewer.camera.changed.addEventListener(updateCamera);
    // moveEnd: 完全停止時にも発火（念のため）
    viewer.camera.moveEnd.addEventListener(updateCamera);
    console.log("Camera listeners added (changed + moveEnd)");

    isInitialized.current = true;
    console.log("Initialization complete!");
  };

  // === SceneMode変更 ===
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

  // === 初期 currentTime を Cesium Clock から取得 ===
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;
    setCurrentTime(JulianDate.toDate(viewer.clock.currentTime));
  }, [setCurrentTime]);

  // === Clock tick の監視で React 側に同期 ===
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    const interval = setInterval(() => {
      setCurrentTime(JulianDate.toDate(viewer.clock.currentTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [setCurrentTime]);

  // === isPaused / timeSpeed の変更反映 ===
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    const clock = viewer.clock;
    clock.shouldAnimate = !isPaused;
    clock.multiplier = timeSpeed;
  }, [isPaused, timeSpeed]);

  // === クリーンアップ用のuseEffect ===
  useEffect(() => {
    return () => {
      const viewer = viewerRef.current?.cesiumElement;
      if (viewer) {
        console.log("Cleaning up viewer");
      }
    };
  }, []);

  // === Context 側 cameraView が更新されたら Cesium カメラを移動 ===
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;

    if (!viewer) {
      return;
    }

    if (!isInitialized.current) {
      console.log("Context->Cesium: Not initialized yet");
      return;
    }

    if (isUpdatingFromCesium.current) {
      console.log("Context->Cesium: Skipping (updating from Cesium)");
      return;
    }

    const { longitude, latitude, height, heading, pitch, roll } = cameraView;

    try {
      const currentPos = Cartographic.fromCartesian(viewer.camera.position);
      const currentLon = CesiumMath.toDegrees(currentPos.longitude);
      const currentLat = CesiumMath.toDegrees(currentPos.latitude);

      const threshold = 0.001;
      const heightThreshold = 10;

      if (
        Math.abs(currentLon - longitude) < threshold &&
        Math.abs(currentLat - latitude) < threshold &&
        Math.abs(currentPos.height - height) < heightThreshold
      ) {
        console.log("Context->Cesium: Skipping (no significant change)");
        return;
      }

      console.log("Context->Cesium: Moving camera to", {
        longitude,
        latitude,
        height,
      });
      viewer.camera.setView({
        destination: Cartesian3.fromDegrees(longitude, latitude, height),
        orientation: { heading, pitch, roll },
      });
    } catch (error) {
      console.error("Error setting camera view:", error);
    }
  }, [cameraView]);

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
