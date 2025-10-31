import Select from "../components/index/Select/Select";
import Map from "../components/index/Map/Map";

export default function Index() {
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
