import { useEffect, useState } from "react";
import { ResizableBox } from "react-resizable";
import { useMenu } from "../../../context/Menu";
import SubFeatureTab from "../../common/SubFeatureTab";
import { useKasane } from "../../../context/Kasane";
import { showStid } from "./showCalculated";
import { useSpaceTimeID } from "../../../context/SpaceTimeID";
import { NodeRenderer } from "./NodeRenderer";
import { useViewTree } from "../../../hooks/view/useViewTree";
import { useDragDrop } from "../../../hooks/view/useDragDrop";
import { loadJson } from "../../../utils/loadJson";
import { getMinOrder, type Node } from "./Node";

export default function View() {
  const { isMenuOpen } = useMenu();
  const [width, setWidth] = useState(280);

  const { addCollection } = useSpaceTimeID();
  const { processCalculation } = useKasane();

  const handlePairSelected = async (nodeA: Node, nodeB: Node, calculation: any) => {
    if (nodeA.type !== "block" || nodeB.type !== "block") { return }
    const jsonA = await loadJson(nodeA.id);
    const jsonB = await loadJson(nodeB.id);

    const minOrder = String(Math.min(getMinOrder(nodeA), getMinOrder(nodeB)));
    console.log(String(minOrder));
    showStid({
      addCollection,
      processCalculation,
      stid_set_id: minOrder,
      calculation,
      value1: jsonA,
      value2: jsonB,
    });
  };

  const { rootNodes, addNode, startEdit, handleSelectItem } = useViewTree({
    onPairSelected: handlePairSelected,
  });

  useEffect(() => {
    console.log(rootNodes)
  }, [rootNodes])

  const { handleDrop, handleDragOver, handleDragStart } = useDragDrop({
    // ドロップ時に、新しいノードを追加する
    onDropItem: addNode,
  });

  // ライブラリ側の処理に渡すため、nativeEventに強制的に変換
  const handleDropTyped = (e: React.DragEvent<HTMLDivElement>) => handleDrop(e.nativeEvent as DragEvent);
  const handleDragOverTyped = (e: React.DragEvent<HTMLDivElement>) => handleDragOver(e.nativeEvent as DragEvent);
  const handleDragStartTyped = (e: React.DragEvent<HTMLDivElement>, index: number) => handleDragStart(e.nativeEvent as DragEvent, index);

  return (
    <SubFeatureTab mainFeature={"Overview"} subFeature={"ViewManager"}>
      <div className="flex z-50">
        <ResizableBox
          width={width}
          axis="x"
          onResize={(_e, data) => setWidth(data.size.width)}
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
          {/* and と or のボタン */}
          <div>
            <button onClick={() => startEdit("AND")} className="m-2 border-1 hover:border-2">and</button>
            <button onClick={() => startEdit("OR")} className="m-2 border-1 hover:border-2">or</button>
          </div>
          <div
            onDrop={handleDropTyped}
            onDragOver={handleDragOverTyped}
            className="w-full h-full p-4 flex flex-col gap-2 border-2 border-dashed border-gray-300 overflow-y-auto"
          >
            {rootNodes.length === 0 && (
              <p className="text-gray-400 text-center mt-20">ここにドロップ</p>
            )}

            {rootNodes.map((node, index) => (
              <NodeRenderer
                key={index}
                node={node}
                onSelect={handleSelectItem}
                onDragStart={handleDragStartTyped}
                index={index}
              />
            ))}
          </div>
        </ResizableBox>
      </div>
    </SubFeatureTab>
  );
}