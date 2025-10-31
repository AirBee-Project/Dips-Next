import { useState } from "react";
import Menu from "../components/common/Menu/Menu";
import Select from "../components/index/Select/Select";
import Map from "../components/index/Map/Map";

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [width, setWidth] = useState(200);

  return (
    <div className="flex">
      <div className="flex z-10">
        {/* デフォルトのメニュー */}
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* ドラッグアンドドロップが可能なエリア */}
        <Select isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      {/* 地図を表示するエリア */}
      <Map />
    </div>
  );
}
