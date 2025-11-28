import { useState } from "react";
import { ResizableBox } from "react-resizable";
import SearchBox from "../common/SearchBox";
import PlusPullDown from "../common/PlusPullDown";
import {
  IconCursorText,
  IconLetterCase,
  IconLine,
  IconNumber123,
  IconPoint,
  IconPointer,
  IconSquaresSelected,
  IconTriangle,
} from "@tabler/icons-react";
import SubFeatureTab from "../common/SubFeatureTab";
import {
  ColoredInput,
  type ParsedPart,
  type Parser,
} from "../common/ColoredInput";
import ColorPickerButton from "../common/ColorPickerButton";
import IdInput from "../common/IdInput";

const spaceOrCommaParser: Parser = (text: string): ParsedPart[] => {
  const parts: string[] = [];
  const separators: string[] = [];
  let currentPart = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === " " || char === ",") {
      if (currentPart) {
        parts.push(currentPart);
        separators.push(char);
        currentPart = "";
      }
    } else {
      currentPart += char;
    }
  }

  // 最後の部分を追加
  if (currentPart) {
    parts.push(currentPart);
  }

  return parts.map(
    (part: string, index: number): ParsedPart => ({
      text: part,
      separator: index < separators.length ? separators[index] : "",
    })
  );
};

export default function Value() {
  //横幅
  const [width, setWidth] = useState(290);

  //検索
  const [assetsSearch, setAssetsSearch] = useState("");

  const [ids, setIds] = useState<string[]>([]);

  //Keyを追加するときはここであれこれする
  function addTextKey(key: string) {
    console.log(key);
  }

  const [text, setText] = useState<string>("");

  return (
    <SubFeatureTab mainFeature={"MyData"} subFeature={"ValueObject"}>
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
              placeholder={"値を検索"}
              search={assetsSearch}
              setSearch={setAssetsSearch}
              className="mr-2 w-fit z-10"
            />
            <PlusPullDown
              handleClick={addTextKey}
              className="z-20"
              pullDowns={{
                select: {
                  text: "IDを選択",
                  icon: IconPointer,
                },
                input: {
                  text: "IDを入力",
                  icon: IconCursorText,
                },
                point: {
                  text: "Point",
                  icon: IconPoint,
                },
                line: {
                  text: "Line",
                  icon: IconLine,
                },
                triangle: {
                  text: "Triangle",
                  icon: IconTriangle,
                },
              }}
            />
          </div>
          <div className="mt-3 w-full flex flex-col items-center">
            <div
              className="relative w-[80%] rounded-md p-3 transition-all duration-200 border-[3px] border-gray-100 focus-within:border-accent-200/50
            "
            >
              <ColorPickerButton
                storageKey="value-object-color"
                className="!absolute top-5 right-3 z-10"
              />
              <input
                type="text"
                className="text-2xl text-gray-400 w-full pt-1 pb-3 placeholder-gray-100 outline-none"
                placeholder="値を入力"
              />
              <IdInput
                value={ids}
                onChange={setIds}
                className="mt-1"
                placeholder="IDを入力"
              />
            </div>
          </div>
        </ResizableBox>
      </div>
    </SubFeatureTab>
  );
}
