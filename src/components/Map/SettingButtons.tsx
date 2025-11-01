import { IconClock, IconMinus, IconPlus, IconWorld } from "@tabler/icons-react";
import SettingMap from "./SettingMap";

export default function SettingButtons() {
  return (
    <div className="relative">
      <div className="transition-all">
        {/* 時間の設定 */}
        <div className="bg-white rounded-[3px] mb-2 hover:bg-gray-100  duration-100">
          <div className="p-1 text-gray-300">
            <IconClock stroke={2.5} size={20} />
          </div>
        </div>

        {/* 地図の設定 */}
        <div className="bg-white rounded-[3px] mb-2 hover:bg-gray-100  duration-100">
          <div className="p-1 text-gray-300">
            <IconWorld stroke={2.5} size={20} />
          </div>
        </div>

        {/* ZoomIn and ZoomOut */}
        <div className="bg-white rounded-[3px]">
          <div className="p-1 text-gray-300 hover:bg-gray-100  duration-100">
            <IconPlus stroke={2.5} size={20} />
          </div>
          {/* 間の中間棒 */}
          <div className="border-t mx-1 border-gray-300"></div>
          <div className="p-1 text-gray-300 hover:bg-gray-100  duration-100">
            <IconMinus stroke={2.5} size={20} />
          </div>
        </div>
      </div>

      {/* これより下では実際の設定画面を管理する */}
    </div>
  );
}
