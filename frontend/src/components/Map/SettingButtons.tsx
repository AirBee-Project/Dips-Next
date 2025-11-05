import { IconClock, IconMinus, IconPlus, IconWorld } from "@tabler/icons-react";
import { useMap } from "../../context/Map";
import { Cartesian3, EasingFunction } from "cesium";

export default function SettingButtons() {
  const { setWindowMode, windowMode, viewerRef } = useMap();

  function zoomIn() {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const camera = viewer.camera;

    // 現在の位置と方向を取得
    const direction = camera.direction; // 単位ベクトル
    const moveDistance = 1000; // ズームイン距離（メートル）

    // 進行方向に移動した座標を算出
    const newPosition = Cartesian3.add(
      camera.position,
      Cartesian3.multiplyByScalar(direction, moveDistance, new Cartesian3()),
      new Cartesian3()
    );

    // アニメーション的に移動
    camera.flyTo({
      destination: newPosition,
      orientation: {
        heading: camera.heading,
        pitch: camera.pitch,
        roll: camera.roll,
      },
      duration: 0.5,
      easingFunction: EasingFunction.QUADRATIC_IN_OUT,
    });
  }

  function ZoomOut() {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const camera = viewer.camera;

    // 現在の位置と方向を取得
    const direction = camera.direction; // 単位ベクトル
    const moveDistance = -1000; // ズームイン距離（メートル）

    // 進行方向に移動した座標を算出
    const newPosition = Cartesian3.add(
      camera.position,
      Cartesian3.multiplyByScalar(direction, moveDistance, new Cartesian3()),
      new Cartesian3()
    );

    // アニメーション的に移動
    camera.flyTo({
      destination: newPosition,
      orientation: {
        heading: camera.heading,
        pitch: camera.pitch,
        roll: camera.roll,
      },
      duration: 0.5,
      easingFunction: EasingFunction.QUADRATIC_IN_OUT,
    });
  }

  return (
    <div className="relative">
      <div className="transition-all">
        {/* 時間の設定 */}
        <div
          onClick={() => {
            windowMode === "Time"
              ? setWindowMode("Hide")
              : setWindowMode("Time");
          }}
          className={`bg-white rounded-[3px] mb-2 hover:bg-gray-100  duration-100 ${
            windowMode === "Time" && "bg-gray-100"
          }`}
        >
          <div className="p-1 text-gray-300">
            <IconClock stroke={2.5} size={20} />
          </div>
        </div>

        {/* 地図の設定 */}
        <div
          onClick={() => {
            windowMode === "Map" ? setWindowMode("Hide") : setWindowMode("Map");
          }}
          className={`bg-white rounded-[3px] mb-2 cursor-pointer hover:bg-gray-100 duration-100 ${
            windowMode === "Map" && "bg-gray-100"
          }`}
        >
          <div className={`p-1 text-gray-300`}>
            <IconWorld stroke={2.5} size={20} />
          </div>
        </div>

        {/* ZoomIn and ZoomOut */}
        <div className="bg-white rounded-[3px]">
          <div className="p-1 text-gray-300 hover:bg-gray-100  duration-100 rounded-[3px]">
            <IconPlus stroke={2.5} size={20} onClick={zoomIn} />
          </div>
          {/* 間の中間棒 */}
          <div className="border-t mx-1 border-gray-300"></div>
          <div className="p-1 text-gray-300 hover:bg-gray-100  duration-100 rounded-[3px]">
            <IconMinus stroke={2.5} size={20} onClick={ZoomOut} />
          </div>
        </div>
      </div>
    </div>
  );
}
