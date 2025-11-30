import { useEffect, useState } from "react";
import ColorPickerButton from "../common/ColorPickerButton";
import { IconHandFinger } from "@tabler/icons-react";
import { useMap } from "../../context/Map";
import { useSpaceTimeID, type SpaceTimeID } from "../../context/SpaceTimeID";
import { Color } from "cesium";
import init, { wasm_get_drone_route } from "../../route";

export default function RouteSearch() {
  const { setRouteStart, setRouteEnd } = useMap();
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [zoomLevel, setZoomLevel] = useState("");

  const { addCollection, removeCollection } = useSpaceTimeID();

  useEffect(() => {
    init().then(() => {
      console.log("Wasm loaded!");
    });
  }, []);

  const handleKeyDown = (
    e: React.KeyboardEvent,
    text: string,
    setFunc: (p: any) => void
  ) => {
    if (e.key === "Enter") {
      const parts = text.split(/[,\s/]+/).map((s) => parseFloat(s.trim()));

      if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        setFunc({
          lat: parts[0],
          lon: parts[1],
          height: parts[2] || 0,
        });
      }
    }
  };

  const handleSearch = () => {
    // ban_list は例として空配列
    const banList: string[] = [];

    // Wasm 呼び出し
    const route: SpaceTimeID[] = wasm_get_drone_route(
      20,
      "35.6895/139.6917/1000",
      "35.6812/139.7671/100",
      banList
    ).map((r) => ({
      z: Number(r.z),
      f: Number(r.f),
      x: Number(r.x),
      y: Number(r.y),
    }));

    console.log(route);

    removeCollection("route");

    // 地図コンテキストにセット
    addCollection({
      id: "route",
      spaceTimeIDs: route,
      style: {
        color: Color.RED,
        alpha: 0.5,
        outlineColor: Color.BLACK,
      },
      visible: true,
    });
  };

  return (
    <div className="flex flex-col h-full p-3 bg-white">
      {/* タイトル */}
      <div className="flex text-lg items-center gap-2 mb-2 text-gray-800 font-bold">
        <span>航路検索</span>
        <div className="mt-1 ml-2">
          <ColorPickerButton
            storageKey="route-search-color"
            defaultColor="#4599a4"
          />
        </div>
        <div className="ml-auto">
          <IconHandFinger size={20} />
        </div>
      </div>

      {/* 入力 */}
      <div className="flex flex-col gap-3 p-2">
        {/* 出発地 */}
        <div className="text-ms flex gap-3 items-center relative group">
          <div className="mt-1">
            <ColorPickerButton
              storageKey="route-start-color"
              defaultColor="#63c993"
            />
          </div>
          <span>始点</span>
          <input
            type="text"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, startPoint, setRouteStart)}
            placeholder="緯度/経度/高度"
            className="gap-2 pl-2 w-2/3 pr-3 py-2 border-2 border-gray-100 rounded-md text-xs text-gray-100 outline-none focus:border-accent-300 transition-all placeholder-gray-200 text-gray-700"
          />
        </div>

        {/* 目的地 */}
        <div className="ftext-ms flex gap-3 items-center relative group">
          <div className="mt-1">
            <ColorPickerButton
              storageKey="route-end-color"
              defaultColor="#ed1414"
            />
          </div>
          <span>終点</span>
          <input
            type="text"
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, endPoint, setRouteEnd)}
            placeholder="緯度/経度/高度"
            className="gap-2 pl-2 w-2/3 pr-3 py-2 border-2 border-gray-100 rounded-md text-xs text-gray-100 outline-none focus:border-accent-300 transition-all placeholder-gray-200 text-gray-700"
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* ズームレベル */}
          <div className="ftext-ms flex gap-3 items-center relative group">
            <span>ズームレベル</span>
            <input
              type="text"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(e.target.value)}
              placeholder="Z"
              className="gap-2 pl-2 w-1/5 pr-3 py-1.5 border-2 border-gray-100 rounded-md text-xs text-gray-100 outline-none focus:border-accent-300 transition-all placeholder-gray-200 text-gray-700"
            />
          </div>

          {/* 検索ボタン */}
          <button
            className="self-end mt-auto w-1/4 text-xs py-1 bg-gray-100/80 text-gray font-bold rounded-sm hover:bg-accent-200 transition-all flex items-center justify-center gap-2"
            onClick={handleSearch}
          >
            検索
          </button>
        </div>
      </div>
    </div>
  );
}
