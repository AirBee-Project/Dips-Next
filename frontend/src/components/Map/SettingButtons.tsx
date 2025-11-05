import { IconClock, IconMinus, IconPlus, IconWorld } from "@tabler/icons-react";
import { useMap } from "../../context/Map";
import { Cartesian3, EasingFunction } from "cesium";
import { zoomInAnimated, zoomOutAnimated } from "../../ulits/CesiumuZoom";

export default function SettingButtons() {
  const { setWindowMode, windowMode, viewerRef } = useMap();

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
            <IconPlus
              stroke={2.5}
              size={20}
              onClick={() => {
                zoomInAnimated(viewerRef.current, 1000, 0.5);
              }}
            />
          </div>
          {/* 間の中間棒 */}
          <div className="border-t mx-1 border-gray-300"></div>
          <div className="p-1 text-gray-300 hover:bg-gray-100  duration-100 rounded-[3px]">
            <IconMinus
              stroke={2.5}
              size={20}
              onClick={() => {
                zoomOutAnimated(viewerRef.current, 1000, 0.5);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
