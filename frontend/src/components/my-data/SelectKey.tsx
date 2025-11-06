import { useState } from "react";
import { ResizableBox } from "react-resizable";
import SearchBox from "../common/SearchBox";
import PlusPullDown from "../common/PlusPullDown";

export default function SelectKey() {
  //横幅
  const [width, setWidth] = useState(290);

  //検索
  const [assetsSearch, setAssetsSearch] = useState("");

  return (
    <div className="flex z-50">
      <ResizableBox
        width={width}
        axis="x"
        onResize={(e, data) => setWidth(data.size.width)}
        minConstraints={[240, 200]}
        maxConstraints={[450, 200]}
        handle={
          <span
            className="absolute top-0 right-0 h-full w-2 cursor-ew-resize"
            onClick={(e) => e.stopPropagation()} // 選択防止
          />
        }
        handleSize={[10, 10]} // ドラッグ範囲
        className={`$ w-full border-r-4 h-screen bg-white-100 flex flex-col items-center border-gray-100`}
      >
        {/* 検索と追加 */}
        <div className="mt-7 flex items-center justify-center w-[80%]">
          <SearchBox
            placeholder={"属性を検索"}
            search={assetsSearch}
            setSearch={setAssetsSearch}
            className="mr-2"
          />
          <PlusPullDown />
        </div>
      </ResizableBox>
    </div>
  );
}
