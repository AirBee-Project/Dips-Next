import { useState, type DragEvent } from "react";
import { ResizableBox } from "react-resizable";
import { useMenu } from "../../../context/Menu";
import SubFeatureTab from "../../common/SubFeatureTab";
import { SpaceTimeIDDataList } from "../../../data/SpaceTimeID";
import Block from "./Block"
import type { Node } from "./types"
import BlockNode from "./Block";
import type { Calculation } from "../../../context/Kasane";
import { showStid } from "./showCalculated";
export type DroppedItem = {
  id: string; // titleKey
};

export default function View() {
  const { isMenuOpen } = useMenu();
  // const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [width, setWidth] = useState(280);

  const [isEditMode, setIsEditMode] = useState(false);
  const [calculation, setCalculation] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [rootNodes, setRootNodes] = useState<Node[]>([]);
  // const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;
    // 並べ替え時に下の値はundefinedになる
    const json = loadJson(data)

    // if (data && !droppedItems.find((item) => item.id === data)) {
    //   setDroppedItems([...droppedItems, { id: data }]);
    // }
    const newNode: Node = { type: "block", id: data };
    // setRootNodes([...rootNodes, newNode]);
    setRootNodes((prev) => [...prev, newNode]);
    console.log(rootNodes)

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

  // 並び替え可能は難しそうなのでパス
  // const handleDropOnItem = (
  //   e: React.DragEvent<HTMLDivElement>,
  //   targetIndex: number,
  // ) => {
  //   e.preventDefault();
  //   const dragIndex = Number(e.dataTransfer.getData("dragIndex"));
  //   if (dragIndex === targetIndex) return;

  //   // if (isRootNode) {
  //   const newNodes = [...rootNodes];
  //   const [movedNode] = newNodes.splice(dragIndex, 1);
  //   newNodes.splice(targetIndex, 0, movedNode);
  //   setRootNodes(newNodes);
  //   // } else {
  //   const newItems = [...droppedItems];
  //   const [movedItem] = newItems.splice(dragIndex, 1);
  //   newItems.splice(targetIndex, 0, movedItem);
  //   setDroppedItems(newItems);
  //   // }
  //   console.log("hu")
  //   console.log(newNodes)
  // };

  const loadJson = async (id: string) => {
    const item = SpaceTimeIDDataList[id];
    if (!item?.json_url) return null;

    try {
      const res = await fetch(item.json_url);
      return await res.json();
    } catch (err) {
      console.error("JSON読み込みエラー:", err);
      return null;
    }
  };

  const hundleAnd = () => {
    console.log("huuand")
    setIsEditMode(true);
    setSelectedItems([]);
    setCalculation("AND")
  }
  const hundleOr = () => {
    setIsEditMode(true);
    setSelectedItems([]);
    setCalculation("OR")
  }

  const handleSelectItem = async (id: string) => {
    console.log("huug")
    if (!isEditMode) return;
    console.log("huu")
    // すでに選択済みなら無視
    if (selectedItems.includes(id)) return;

    const newSelected = [...selectedItems, id];
    setSelectedItems(newSelected);

    // 2つ揃ったら JSON を読み込んで console.log
    if (newSelected.length === 2) {
      const [idA, idB] = newSelected;

      const jsonA = await loadJson(idA);
      const jsonB = await loadJson(idB);

      console.log("選択 JSON A:", jsonA);
      console.log("選択 JSON B:", jsonB);

      // const remaining = droppedItems.filter(
      //   (item) => !newSelected.includes(item.id)
      // );

      showStid("test", calculation, jsonA, jsonB)

      // 結合した二つを削除
      // setDroppedItems(remaining);
      // rootNodes に追加
      const node = createNodeFromSelected(newSelected, "AND");
      // setRootNodes([...rootNodes, node]);
      setRootNodes((prev) => [...prev, node]);
      // Edit モード終了
      setIsEditMode(false);
      setSelectedItems([]);
    }
  };

  // const handleSelectNode = (node: Node) => {
  //   console.log("guug")
  //   if (!isEditMode) return;
  //   console.log("guu")
  //   if (selectedNodes.includes(node)) return;

  //   const newSelected = [...selectedNodes, node];
  //   setSelectedNodes(newSelected);

  //   if (newSelected.length >= 2) {
  //     const combinedNode: Node = { type: "group", groupType: "AND", children: newSelected };
  //     // rootNodes 更新
  //     const remainingNodes = rootNodes.filter(n => !newSelected.includes(n));
  //     setRootNodes([...remainingNodes, combinedNode]);
  //     setSelectedNodes([]);
  //     setIsEditMode(false);
  //   }
  // };

  const createNodeFromSelected = (selected: string[], type: "AND" | "OR"): Node => {
    const children: Node[] = selected.map(id => ({ type: "block", id }));
    return { type: "group", groupType: type, children };
  };

  // const NodeRenderer = ({ node, onSelect, index }: { node: Node; onSelect: (id: string) => void; index: number }) => {
  const NodeRenderer = ({ node, index }: { node: Node; index: number }) => {
    if (node.type === "block") {
      return <Block key={node.id}
        item={{ id: node.id }}
        index={index}
        onSelect={handleSelectItem}
        // onSelect={onSelect}
        onDragStart={handleDragStart}
      // onDropOnItem={handleDropOnItem} 
      />;
    } else {
      return (
        <div className="group-node">
          <span>{node.groupType}</span>
          <div className="children">
            {node.children.map((child, i) => (
              <NodeRenderer key={i} node={child} index={i} />
            ))}
          </div>
        </div>
      );
    }
  };

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
            <button onClick={hundleAnd} className="m-2 border-1 hover:border-2">and</button>
            <button onClick={hundleOr} className="m-2 border-1 hover:border-2">or</button>
          </div>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="w-full h-full p-4 flex flex-col gap-2 border-2 border-dashed border-gray-300 overflow-y-auto"
          >
            {rootNodes.length === 0 && (
              <p className="text-gray-400 text-center mt-20">ここにドロップ</p>
            )}

            {/* {rootNodes.map((node, index) => (
              <NodeRenderer key={index} node={node} onSelect={handleSelectNode} index={index} />
            ))} */}

            {rootNodes.map((node, index) => (
              <NodeRenderer
                key={index}
                node={node}
                // onSelect={(n) => {
                //   if (node.type === "block") handleSelectItem(n);
                //   else handleSelectNode(node);
                // }}
                index={index}
              />
            ))}

            {/* {droppedItems.map((item, index) => (
              <Block
                key={item.id}
                item={item}
                index={index}
                onSelect={handleSelectItem}
                onDragStart={handleDragStart}
                onDropOnItem={handleDropOnItem}
              />
            ))} */}
          </div>
        </ResizableBox>
      </div>
    </SubFeatureTab>
  );
}
