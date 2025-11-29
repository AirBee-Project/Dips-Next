import { useState } from "react";
import { ResizableBox } from "react-resizable";
import { useMenu } from "../../../context/Menu";
import SubFeatureTab from "../../common/SubFeatureTab";
import { SpaceTimeIDDataList } from "../../../data/SpaceTimeID";

type DroppedItem = {
  id: string; // titleKey
};

export default function View() {
  const { isMenuOpen } = useMenu();
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [width, setWidth] = useState(280);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");

    // 並べ替え時に下の値はundefinedになる
    const itemData = SpaceTimeIDDataList[data];
    if (itemData?.json_url) {
      try {
        const res = await fetch(itemData.json_url);
        const json = await res.json();
        console.log("JSON内容:", json);
      } catch (err) {
        console.error("JSON読み込みエラー:", err);
      }
    }


    if (data && !droppedItems.find((item) => item.id === data)) {
      setDroppedItems([...droppedItems, { id: data }]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // 並び替え用ハンドラ
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData("dragIndex", index.toString());
  };

  const handleDropOnItem = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData("dragIndex"));
    if (dragIndex === targetIndex) return;

    const newItems = [...droppedItems];
    const [movedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(targetIndex, 0, movedItem);
    setDroppedItems(newItems);
  };

  const hundleAnd = () => {

  }
  const hundleOr = () => {

  }
  return (
    <SubFeatureTab mainFeature={"Overview"} subFeature={"ViewManager"}>
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
          className={`${isMenuOpen ? "w-70 border-r-4" : "hidden"
            } h-screen bg-white-100 flex flex-col items-center border-gray-100`}
        >
          {/* and or ボタン */}
          <div>
            <button onClick={hundleAnd} className="m-2 border-1">and</button>
            <button onClick={hundleOr} className="m-2 border-1">or</button>
          </div>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="w-full h-full p-4 flex flex-col gap-2 border-2 border-dashed border-gray-300 overflow-y-auto"
          >
            {droppedItems.length === 0 && (
              <p className="text-gray-400 text-center mt-20">ここにドロップ</p>
            )}

            {droppedItems.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDropOnItem(e, index)}
                className="border p-2 rounded bg-gray-100 cursor-grab active:cursor-grabbing"
              >
                {item.id}
              </div>
            ))}
          </div>
        </ResizableBox>
      </div>
    </SubFeatureTab>
  );
}
