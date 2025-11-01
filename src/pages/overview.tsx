import Select from "../components/overview/Select/Select";
import Map from "../components/Map/Map";

export default function Overview() {
  return (
    <div className="flex overflow-x-hidden">
      <div className="flex z-10">
        {/* ドラッグアンドドロップが可能なエリア */}
        <Select />
      </div>
      {/* 地図を表示するエリア */}
      <Map />
    </div>
  );
}
