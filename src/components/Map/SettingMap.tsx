import SearchBox from "../common/SearchBox";
import { IconX } from "@tabler/icons-react";
import SettingMapPattern from "./SettingMapPattern";
import RadioButtons from "../common/RadioButtons";
import { useMap } from "../../context/Map";
import { XYZTileMapList } from "../../data/XYZTailMapList";

export default function SettingMap() {
  const { windowMode, setWindowMode, sceneMode, setSceneMode, tileId } =
    useMap();

  return (
    <div
      className={` ${
        windowMode === "Map"
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } bg-white-100 rounded-md w-full pt-5 pb-7 px-5`}
    >
      {/* 地図のテクスチャ設定 */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <p className="text-2xl text-gray-300">地図の詳細</p>
          <div
            onClick={() => {
              setWindowMode("Hide");
            }}
          >
            <IconX className="hover:text-accent-300 cursor-pointer" />
          </div>
        </div>
        <div className="mb-5">
          <SearchBox placeholder={"地図を検索"} className="" />
        </div>

        <div className="flex flex-col gap-4 max-h-64 overflow-y-auto">
          <SettingMapPattern
            id={tileId}
            img={XYZTileMapList[tileId].sampleUrl}
            title={XYZTileMapList[tileId].name}
            text={XYZTileMapList[tileId].detailText || "説明なし"}
            link={XYZTileMapList[tileId].detailUrl}
          />
          {Object.values(XYZTileMapList).map(
            (mapItem) =>
              tileId != mapItem.id && (
                <SettingMapPattern
                  id={mapItem.id}
                  img={mapItem.sampleUrl}
                  title={mapItem.name}
                  text={mapItem.detailText || "説明なし"}
                  link={mapItem.detailUrl}
                />
              )
          )}
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
