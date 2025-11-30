import { useEffect, useState } from "react";
import ColorPickerButton from "../common/ColorPickerButton";
import { IconHandFinger, IconSearch } from "@tabler/icons-react";
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
  const { getAllSpaceTimeIDs } = useSpaceTimeID();

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
      const parts = text.split(/[\/\s,]+/).map((s) => parseFloat(s.trim()));

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
    removeCollection("route");

    const validateInput = (input: string, name: string) => {
      const parts = input.split("/");
      if (parts.length !== 3 || parts.some(p => isNaN(parseFloat(p.trim())) || p.trim() === "")) {
        alert(`${name}の形式が間違っています。`);
        return false;
      }
      return true;
    };

    if (!validateInput(startPoint, "始点")) return;
    if (!validateInput(endPoint, "終点")) return;

    const zoom = parseInt(zoomLevel, 10);
    if (isNaN(zoom)) {
      alert("ズームレベルを入力してください");
      return;
    }

    try {
      const banList: string[] = getAllSpaceTimeIDs();

      // Wasm 呼び出し
      const route: SpaceTimeID[] = wasm_get_drone_route(
        zoom,
        startPoint.trim(),
        endPoint.trim(),
        banList
      ).map((r) => ({
        z: Number(r.z),
        f: Number(r.f),
        x: Number(r.x),
        y: Number(r.y),
      }));

      console.log("Route result:", route);

      if (route.length === 0) {
        alert("ルートが見つかりませんでした。");
        return;
      }

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

    } catch (error) {
      console.error("Wasm Error:", error);
      alert("ルート検索中にエラーが発生しました。");
    }
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
        <div className="text-xs flex gap-3 items-center relative group">
          <div className="mt-1">
            <ColorPickerButton
              storageKey="route-start-color"
              defaultColor="#63c993"
            />
          </div>
          <span className="whitespace-nowrap font-bold text-gray-500 w-8">始点</span>
          <input
            type="text"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, startPoint, setRouteStart)}
            placeholder="緯度/経度/高度"
            className="w-full pl-2 pr-3 py-2 border-2 border-gray-100 rounded-md text-xs text-gray-700 outline-none focus:border-accent-300 transition-all placeholder-gray-300 font-mono"
          />
        </div>

        {/* 目的地 */}
        <div className="text-xs flex gap-3 items-center relative group">
          <div className="mt-1">
            <ColorPickerButton
              storageKey="route-end-color"
              defaultColor="#ed1414"
            />
          </div>
          <span className="whitespace-nowrap font-bold text-gray-500 w-8">終点</span>
          <input
            type="text"
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, endPoint, setRouteEnd)}
            placeholder="緯度/経度/高度"
            className="w-full pl-2 pr-3 py-2 border-2 border-gray-100 rounded-md text-xs text-gray-700 outline-none focus:border-accent-300 transition-all placeholder-gray-300 font-mono"
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* ズームレベル */}
          <div className="text-xs flex gap-3 items-center relative group">
            <span className="font-bold text-gray-500">ズームレベル</span>
            <input
              type="text"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(e.target.value)}
              placeholder="Z"
              className="w-12 px-2 py-1.5 border-2 border-gray-100 rounded-md text-xs text-center text-gray-700 outline-none focus:border-accent-300 transition-all placeholder-gray-300 font-mono"
            />
          </div>

          {/* 検索ボタン */}
          <button
            className="px-4 py-1.5 bg-gray-100 text-gray-500 font-bold rounded-md hover:bg-accent-300 hover:text-white transition-all text-xs flex items-center gap-1"
            onClick={handleSearch}
          >
            <IconSearch size={14} />
            検索
          </button>
        </div>
      </div>
    </div>
  );
}
