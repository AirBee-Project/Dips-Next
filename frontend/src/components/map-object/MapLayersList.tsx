import { useState } from "react";
import { ResizableBox } from "react-resizable";
import { useMenu } from "../../context/Menu";
import {
  IconEye, IconEyeOff, IconTrash, IconViewfinder
} from "@tabler/icons-react";

import ColorPickerButton from "../common/ColorPickerButton";
import { useMapObject } from "../../context/MapObjectContext";

export default function MapLayersList() {
  const { layers, removeLayer, updateLayer } = useMapObject();
  const { isMenuOpen } = useMenu();

  const [width, setWidth] = useState(220);

  if (!isMenuOpen && layers.length === 0) return null;

  return (
    <div className="flex z-40 pointer-events-auto h-full">
      <ResizableBox
        width={width}
        axis="x"
        onResize={(e, data) => setWidth(data.size.width)}
        minConstraints={[240, 200]}
        maxConstraints={[500, 200]}
        handle={
          <span
            className="absolute top-0 right-0 h-full w-2 cursor-ew-resize"
            onClick={(e) => e.stopPropagation()}
          />
        }
        handleSize={[10, 10]}
        className={`${isMenuOpen ? "" : "hidden"} h-screen bg-white-100 border-r-4 border-gray-100 flex flex-col`}
      >

        {/* リスト */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 hidden-scrollbar">
          {layers.map((layer) => (
            <div key={layer.instanceId} className="bg-white border-2 border-gray-100 rounded-lg p-3 hover:border-accent-200 ">

              {/*冗談*/}
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-sm font-bold truncate ${layer.visible ? "text-gray-700" : "text-gray-400"}`}>
                  {layer.data.name}
                </span>
              </div>

              {/*下段*/}
              <div className="flex items-center gap-2 h-2">

                {/*カラーピッカー*/}
                <div className="flex-shrink-0">
                  <ColorPickerButton
                    storageKey={`layer-color-${layer.instanceId}`}
                    defaultColor={layer.color}
                    onColorChange={(c, a) => updateLayer(layer.instanceId, { color: c, opacity: a })}
                  />
                </div>

                {/*画面focus*/}
                <button
                  onClick={() => updateLayer(layer.instanceId, { visible: true })}
                  className="p-1 text-gray-400 hover:text-accent-300 hover:bg-accent-50 rounded transition-colors"
                >
                  <IconViewfinder size={17} />
                </button>

                {/*表示切り替え*/}
                <button
                  onClick={() => updateLayer(layer.instanceId, { visible: !layer.visible })}
                  className="p-0 text-gray-400 hover:text-accent-300 hover:bg-accent-50 rounded transition-colors"
                >
                  {layer.visible ? <IconEye size={20} /> : <IconEyeOff size={20} />}
                </button>

                {/*削除*/}
                <button
                  onClick={() => removeLayer(layer.instanceId)}
                  className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <IconTrash size={18} />
                </button>

              </div>
            </div>
          ))}
        </div>
      </ResizableBox>
    </div>
  );
}