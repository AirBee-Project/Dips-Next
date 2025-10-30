import { useState, type SetStateAction } from "react";
import SearchBox from "../../common/SearchBox";

type Props = {
  isMenuOpen: Boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Pattern = "function" | "assets";

export default function Assets(props: Props) {
  //モードに関する状態
  const [Pattern, setPattern] = useState("assets");

  //検索の文字列
  const [functionSearch, setFunctionSearch] = useState("");
  const [assetsSearch, setAssetsSearch] = useState("");

  return (
    <div
      className={`${
        props.isMenuOpen ? "w-65 border-r-4" : "hidden"
      } h-screen bg-white-100 flex flex-col items-center transition-all duration-250 ease-in-out border-gray-100 @container`}
    >
      {/* 属性か関数かの選択 */}
      <div className="flex my-7 w-45 justify-between">
        <p className="text-gray-400 border-b-3 border-gray-100 px-6 pb-0.5">
          属性
        </p>
        <p className="text-gray-400 px-6">関数</p>
      </div>

      {/* 検索 */}
      <SearchBox
        placeholder={"属性を検索"}
        search={assetsSearch}
        setSearch={setAssetsSearch}
      />
    </div>
  );
}
