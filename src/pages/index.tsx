import { useState } from "react";
import Menu from "../components/common/Menu/Menu";
import Select from "../components/index/Select/Select";
import Map from "../components/index/Map/Map";

export default function Index() {
  return (
    <div className="flex">
      <div className="flex z-10">
        {/* デフォルトのメニュー */}
        <Menu />

        {/* ドラッグアンドドロップが可能なエリア */}
        <Select />
      </div>

      {/* 地図を表示するエリア */}
      <Map />
    </div>
  );
}
