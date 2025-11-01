import SearchBox from "../common/SearchBox";
import { IconX } from "@tabler/icons-react";
import SettingMapPattern from "./SettingMapPattern";
import RadioButtons from "../common/RadioButtons";
import { useState } from "react";

export default function SettingMap() {
  const [drawMode, setDrawMode] = useState("day");

  return (
    <div className="bg-white-100 rounded-md w-full pt-5 pb-7 px-5">
      {/* 地図のテクスチャ設定 */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <p className="text-2xl text-gray-300">地図の詳細</p>
          <div>
            <IconX className="hover:text-accent-300 cursor-pointer" />
          </div>
        </div>
        <div className="mb-5">
          <SearchBox placeholder={"地図を検索"} className="" />
        </div>

        <div className="flex flex-col gap-4 max-h-64 overflow-y-auto">
          <SettingMapPattern
            img={"https://cyberjapandata.gsi.go.jp/xyz/std/11/1817/808.png"}
            title={"基本調査地図"}
            text={
              "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
            }
            now
          />
          <SettingMapPattern
            img={"https://cyberjapandata.gsi.go.jp/xyz/std/11/1817/808.png"}
            title={"基本調査地図"}
            text={
              "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
            }
          />
          <SettingMapPattern
            img={"https://cyberjapandata.gsi.go.jp/xyz/std/11/1817/808.png"}
            title={"基本調査地図"}
            text={
              "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
            }
            link="/aa"
          />
          <SettingMapPattern
            img={"https://cyberjapandata.gsi.go.jp/xyz/std/11/1817/808.png"}
            title={"基本調査地図"}
            text={
              "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
            }
          />
          <SettingMapPattern
            img={"https://cyberjapandata.gsi.go.jp/xyz/std/11/1817/808.png"}
            title={"基本調査地図"}
            text={
              "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
            }
          />
          <SettingMapPattern
            img={"https://cyberjapandata.gsi.go.jp/xyz/std/11/1817/808.png"}
            title={"基本調査地図"}
            text={
              "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
            }
            link="/aa"
          />
          <SettingMapPattern
            img={"https://cyberjapandata.gsi.go.jp/xyz/std/11/1817/808.png"}
            title={"基本調査地図"}
            text={
              "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
            }
          />
          <SettingMapPattern
            img={"https://cyberjapandata.gsi.go.jp/xyz/std/11/1817/808.png"}
            title={"基本調査地図"}
            text={
              "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
            }
            link="/aa"
          />
          <SettingMapPattern
            img={"https://cyberjapandata.gsi.go.jp/xyz/std/11/1817/808.png"}
            title={"基本調査地図"}
            text={
              "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
            }
          />
          <SettingMapPattern
            img={"https://cyberjapandata.gsi.go.jp/xyz/std/11/1817/808.png"}
            title={"基本調査地図"}
            text={
              "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
            }
            link="/aa"
          />
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
            value={drawMode}
            onChange={setDrawMode}
            options={[
              { label: "球体表示", value: "day" },
              { label: "平面表示", value: "night" },
              { label: "斜め表示", value: "auto" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
