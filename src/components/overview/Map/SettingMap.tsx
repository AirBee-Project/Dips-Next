import SearchBox from "../../common/SearchBox";
import { IconX } from "@tabler/icons-react";
import SettingMapPattern from "./SettingMapPattern";

export default function SettingMap() {
  return (
    <div className="bg-white rounded-md w-full py-5 px-5">
      {/* 地図のテクスチャ設定 */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <p className="text-2xl text-gray-300">地図の詳細</p>
          <div>
            <IconX />
          </div>
        </div>
        <div className="mb-5">
          <SearchBox placeholder={"地図を検索"} className="" />
        </div>

        <div className="flex flex-col gap-4">
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
        </div>
      </div>

      {/* 間の線 */}
      <div className="border border-gray-100 w-full mt-5"></div>

      {/* 描画方法の設定 */}
      <div>
        <p className="text-2xl text-gray-300 mt-5">描画方法</p>
      </div>
    </div>
  );
}
