import { useState, type SetStateAction } from "react";
import Menu from "../components/common/Menu/Menu";
import Assets from "../components/index/Assets/Assets";

export default function Index() {
  // ページ内でMenuの開閉状況を管理する
  // Menu以外にもMenuの開閉と連動するコンポーネントにはステートを与える
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex">
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Assets isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}
