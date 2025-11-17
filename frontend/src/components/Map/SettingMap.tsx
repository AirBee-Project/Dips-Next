import SearchBox from "../common/SearchBox";
import { IconX } from "@tabler/icons-react";
import SettingMapPattern from "./SettingMapPattern";
import RadioButtons from "../common/RadioButtons";
import { useMap } from "../../context/Map";
import { ZXYTileMapList } from "../../data/ZXYTailMap";
import { useState, useMemo } from "react";
import Fuse from "fuse.js";

export default function SettingMap() {
  const { windowMode, setWindowMode, sceneMode, setSceneMode, tileId } =
    useMap();
  const [search, setSearch] = useState("");

  const fuse = useMemo(() => {
    const list = Object.values(ZXYTileMapList);
    return new Fuse(list, {
      keys: ["name", "detailText"], // 検索対象フィールド
      threshold: 0.3, // 0.0〜1.0（低いほど厳密）
      distance: 100, // 単語間距離の許容範囲
      includeScore: true, // スコアを含める
    });
  }, []);

  const filteredList = useMemo(() => {
    if (!search.trim()) return Object.values(ZXYTileMapList);

    const results = fuse.search(search.trim());
    return results.map((r) => r.item);
  }, [search, fuse]);

  //横幅の管理

  return (
    <div
      className={`${windowMode === "Map"
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none hidden"
        } bg-white-100 rounded-md w-full pt-5 pb-7 px-5`}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <p className="text-2xl text-gray-300">地図の詳細</p>
          <div onClick={() => setWindowMode("Hide")}>
            <IconX className="hover:text-accent-300 cursor-pointer" />
          </div>
        </div>

        <div className="mb-5">
          <SearchBox
            placeholder={"地図を検索"}
            search={search}
            setSearch={setSearch}
          />
        </div>

        {/* 選択中の地図を表示 */}
        <SettingMapPattern
          id={tileId}
          img={ZXYTileMapList[tileId].sampleUrl}
          title={ZXYTileMapList[tileId].name}
          text={ZXYTileMapList[tileId].detailText || "説明なし"}
          link={ZXYTileMapList[tileId].detailUrl}
        />

        {/* 間の線 */}
        <div className="border border-gray-100 w-full mt-5 mb-5"></div>

        <div className="flex flex-col gap-4 h-64 overflow-y-scroll">

          {filteredList
            .filter((mapItem) => mapItem.id !== tileId)
            .map((mapItem) => (
              <SettingMapPattern
                key={mapItem.id}
                id={mapItem.id}
                img={mapItem.sampleUrl}
                title={mapItem.name}
                text={mapItem.detailText || "説明なし"}
                link={mapItem.detailUrl}
              />
            ))}
        </div>
      </div>

      {/* 間の線 */}
      <div className="border border-gray-100 w-full mt-5"></div>

      {/* 描画方法の設定 */}
      <div>
        <p className="text-2xl text-gray-300 mt-5">描画方法</p>
        <div className="mt-3">
          <RadioButtons
            name="map-mode"
            value={sceneMode}
            onChange={setSceneMode}
            options={[
              { label: "球体表示", value: "3D" },
              { label: "平面表示", value: "2D" },
              { label: "斜め表示", value: "Columbus" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
