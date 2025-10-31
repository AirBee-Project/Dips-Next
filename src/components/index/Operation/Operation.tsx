import { useState } from "react";
import { ResizableBox } from "react-resizable";

type Props = {
  isMenuOpen: Boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Operation(props: Props) {
  //横幅
  const [width, setWidth] = useState(280);
  return (
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
    ></ResizableBox>
  );
}
