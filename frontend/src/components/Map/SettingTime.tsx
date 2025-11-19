import SearchBox from "../common/SearchBox";
import { IconX } from "@tabler/icons-react";
import { useMap } from "../../context/Map";
import { useState, useMemo } from "react";
import RadioButtons from "../common/RadioButtons";
import { TimeZoneList } from "../../data/TimeZone";
import RangeInput from "../common/RangeInput";

export default function SettingTime() {
  const {
    windowMode,
    setWindowMode,
    timeZone,
    setTimeZone,
    timeSpeed,
    setCesiumSpeed,
  } = useMap();
  const [search, setSearch] = useState("");

  // タイムゾーンの検索結果
  const filteredTimeZones = useMemo(() => {
    const lower = search.toLowerCase();
    return Object.values(TimeZoneList).filter(
      (tz) =>
        tz.name.toLowerCase().includes(lower) ||
        tz.id.toLowerCase().includes(lower)
    );
  }, [search]);

  // RadioButtons用の options 配列に変換
  const timeZoneOptions = filteredTimeZones.map((tz) => ({
    label: `${tz.name}`,
    value: tz.id,
  }));

  return (
    <div
      className={`${windowMode === "Time"
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none hidden"
        } bg-white-100 rounded-md w-full pt-5 pb-7 px-5`}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <p className="text-2xl text-gray-300">時計の詳細</p>
          <div onClick={() => setWindowMode("Hide")}>
            <IconX className="hover:text-accent-300 cursor-pointer" />
          </div>
        </div>

        {/* タイムゾーン検索 */}
        <div className="mb-5">
          <SearchBox
            placeholder={"タイムゾーンを検索"}
            search={search}
            setSearch={setSearch}
          />
        </div>

        {/* タイムゾーン選択（ラジオボタン） */}
        <div className="h-64 overflow-y-auto">
          {timeZoneOptions.length > 0 ? (
            <RadioButtons
              name="time-zone"
              value={timeZone}
              onChange={setTimeZone}
              options={timeZoneOptions}
            />
          ) : (
            <p className="text-gray-400">該当するタイムゾーンがありません</p>
          )}
        </div>
      </div>
      {/* 間の線 */}
      <div className="border border-gray-100 w-full mt-5"></div>

      {/* 描画方法の設定 */}
      <div>
        <p className="text-2xl text-gray-300 mt-5 mb-5">再生速度</p>
        <div className="w-full flex items-center justify-center pb-4">
          <RangeInput
            value={timeSpeed}
            min={-1000}
            max={1000}
            step={1}
            onChange={(v: number) => setCesiumSpeed(v)}
          />
        </div>
      </div>
    </div>
  );
}
