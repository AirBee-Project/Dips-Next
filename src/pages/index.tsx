import { useState, type SetStateAction } from "react";
import Menu from "../components/common/Menu/Menu";
import Select from "../components/index/Select/Select";

export default function Index() {
  // ページ内でMenuの開閉状況を管理する
  // Menu以外にもMenuの開閉と連動するコンポーネントにはステートを与える
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [width, setWidth] = useState(200);

  return (
    <div className="flex">
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Select isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}
