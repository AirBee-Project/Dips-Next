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
import { findParentGroupFromRootNodes, getMinOrder, type Node } from "./Node";
import type { CheckBoxItems } from "./BlockDetail/types";
import RouteSearch from "../RouteSearch";

export default function View() {
  const { isMenuOpen } = useMenu();
  const [width, setWidth] = useState(280);

  const { addCollection, removeCollection, updateCollection, getVisibleCollections } = useSpaceTimeID();
  const { processCalculation } = useKasane();

  const handlePairSelected = async (nodeA: Node, nodeB: Node, calculation: any) => {
    if (nodeA.type !== "block" || nodeB.type !== "block") { return }
    const jsonA = await loadJson(nodeA.id);
    const jsonB = await loadJson(nodeB.id);

    const minOrder = String(Math.min(getMinOrder(nodeA), getMinOrder(nodeB)));
    console.log(String(minOrder));
    showStid({
      addCollection,
      removeCollection,
      updateCollection,
      getVisibleCollections,
      processCalculation,
      stid_set_id: minOrder,
      calculation,
      value1: jsonA,
      value2: jsonB,
      // rule: []
      rule1: nodeA.type === "block" ? nodeA.rule : [],
      rule2: nodeB.type === "block" ? nodeB.rule : [],
    });
  };

  const handleBlockChanged = async (node: Node, items: CheckBoxItems) => {
    if (node.type !== "block") return;
    node.rule = items;
    // チェック状態に応じて計算処理実行
    console.log(rootNodes)
    console.log(node)
    console.log(items)
    //次のタスク！！！！！！！
    //チェックボックスに合わせて描画
    const nextGroup = findParentGroupFromRootNodes(rootNodes, node)
    console.log(nextGroup)
    if (!nextGroup) { return }
    const jsonA = await loadJson(nextGroup.children[0].type === "block" ? nextGroup.children[0].id : "");
    const jsonB = await loadJson(nextGroup.children[1].type === "block" ? nextGroup.children[1].id : "");
    console.log(String(getMinOrder(nextGroup)));

    showStid({
      addCollection,
      removeCollection,
      updateCollection,
      getVisibleCollections,
      processCalculation,
      stid_set_id: String(getMinOrder(nextGroup)),
      calculation: nextGroup.groupType, // 必要に応じて加工
      value1: jsonA,
      value2: jsonB,
      // rule: items,
      rule1: nextGroup.children[0].type === "block" ? nextGroup.children[0].rule : [],
      rule2: nextGroup.children[1].type === "block" ? nextGroup.children[1].rule : [],
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
            className="w-full h-4/5 p-4 flex flex-col gap-2 border-2 border-dashed border-gray-300 overflow-y-auto"
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
                onChangeBlock={handleBlockChanged}
              />
            ))}
          </div>
          <div className="w-full border-2 border-gray-100 "></div>
          <div className="w-full flex-1 bg-white">
            <RouteSearch />
          </div>
        </ResizableBox>
      </div>
    </SubFeatureTab>
  );
}