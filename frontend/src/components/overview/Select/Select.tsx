import { useState } from "react";
import SearchBox from "../../common/SearchBox";
import { ResizableBox } from "react-resizable";
import Asset from "./Asset";
import { useMenu } from "../../../context/Menu";
import { SpaceTimeIDDataList } from "../../../data/SpaceTimeID";

type Pattern = "function" | "assets";

export default function Select() {
  const { isMenuOpen } = useMenu();

  const [pattern, setPattern] = useState<Pattern>("assets");

  const [functionSearch, setFunctionSearch] = useState("");
  const [assetsSearch, setAssetsSearch] = useState("");

  const [width, setWidth] = useState(280);

  return (
    <div className="flex z-50">
      <ResizableBox
        width={width}
        axis="x"
        onResize={(e, data) => setWidth(data.size.width)}
        minConstraints={[240, 200]}
        maxConstraints={[500, 200]}
        handle={
          <span
            className="absolute top-0 right-0 h-full w-2 cursor-ew-resize"
            onClick={(e) => e.stopPropagation()}
          />
        }
        handleSize={[10, 10]}
        className={`${
          isMenuOpen ? "w-70 border-r-4" : "hidden"
        } h-screen bg-white-100 flex flex-col items-center border-gray-100`}
      >
        {/* 属性か関数かの選択 */}
        <div className="flex mt-7 mb-4 w-45 justify-between">
          <p className="text-gray-400 border-b-3 border-accent-200/50 px-6 pb-0.5">
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
          {Object.entries(SpaceTimeIDDataList)
            .filter(([key]) => key.includes(assetsSearch))
            .map(([titleKey]) => (
              <Asset
                key={titleKey}
                className="w-[80%]"
                title={titleKey}
                assetsType={"String"}
              />
            ))}
        </div>
      </ResizableBox>
    </div>
  );
}
