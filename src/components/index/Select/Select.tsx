import { useState, type SetStateAction } from "react";
import SearchBox from "../../common/SearchBox";
import { ResizableBox } from "react-resizable";
import Asset from "./Asset";

type Props = {
  isMenuOpen: Boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Pattern = "function" | "assets";

export default function Select(props: Props) {
  //モードに関する状態
  const [Pattern, setPattern] = useState("assets");

  //検索の文字列
  const [functionSearch, setFunctionSearch] = useState("");
  const [assetsSearch, setAssetsSearch] = useState("");

  //横幅
  const [width, setWidth] = useState(280);

  return (
    <div className="flex">
      <ResizableBox
        width={width}
        axis="x"
        onResize={(e, data) => setWidth(data.size.width)}
        minConstraints={[240, 200]}
        maxConstraints={[500, 200]}
        handle={
          <span
            className="absolute top-0 right-0 h-full w-2 cursor-ew-resize"
            onClick={(e) => e.stopPropagation()} // 選択防止
          />
        }
        handleSize={[10, 10]} // ドラッグ範囲
        className={`${
          props.isMenuOpen ? "w-70 border-r-4" : "hidden"
        } h-screen bg-white-100 flex flex-col items-center border-gray-100`}
      >
        {/* 属性か関数かの選択 */}
        <div className="flex mt-7 mb-4 w-45 justify-between">
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
          className="w-[80%]"
        />
        {/* 選択肢 */}
        <div className="w-full flex flex-col gap-2 items-center mt-4 overflow-y-scroll hidden-scrollbar">
          <Asset
            title={"天気予報"}
            assetsType={"String"}
            className="w-[80%]"
            detail="テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
            info={[
              { title: "オーナー", text: "AirBee" },
              { title: "更新日", text: "2025/10/4" },
            ]}
          />
          <Asset title={"気温"} assetsType={"Number"} className="w-[80%]" />
          <Asset title={"昼間"} assetsType={"Boolean"} className="w-[80%]" />
          <Asset title={"高速道路"} assetsType={"String"} className="w-[80%]" />
        </div>
      </ResizableBox>
      <ResizableBox
        width={width}
        axis="x"
        onResize={(e, data) => setWidth(data.size.width)}
        minConstraints={[240, 200]}
        maxConstraints={[500, 200]}
        handle={
          <span
            className="absolute top-0 right-0 h-full w-2 cursor-ew-resize"
            onClick={(e) => e.stopPropagation()} // 選択防止
          />
        }
        handleSize={[10, 10]} // ドラッグ範囲
        className={`${
          props.isMenuOpen ? "w-70 border-r-4" : "hidden"
        } h-screen bg-white-100 flex flex-col items-center border-gray-100`}
      >
        {/* こちら側にドラッグアンドドロップする */}
      </ResizableBox>
    </div>
  );
}
