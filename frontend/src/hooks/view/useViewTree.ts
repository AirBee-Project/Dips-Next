import { useState } from "react";
import { getMaxOrder, type Node } from "../../components/overview/View/Node"

/**
 * ビューツリー(Node全体)の構築・選択・編集モード管理を行うカスタムフック
 *
 * @param onPairSelected - AND,ORで2つのノードが選択された際に呼ばれるコールバック
 *                         (idA, idB, calculationType) の形式で通知される。
 */
export function useViewTree({ onPairSelected }: { onPairSelected: (a: Node, b: Node, calculation: "AND" | "OR") => void }) {

  // 表示中のツリー構造のnode
  const [rootNodes, setRootNodes] = useState<Node[]>([]);
  // 編集モード中にユーザーが選択したアイテムID
  const [selectedItems, setSelectedItems] = useState<Node[]>([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [calculation, setCalculation] = useState<"AND" | "OR" | "">("");

  const startEdit = (mode: "AND" | "OR") => {
    setIsEditMode(true);
    setCalculation(mode);
    setSelectedItems([]);
  };

  /**
   * 最も基礎的な単一ノードを追加する
   */
  const addNode = (id: string) => {
    setRootNodes((prev: any) => [...prev, { type: "block", id, order: getMaxOrder(prev) + 1 }]);
  };

  /**
   * ノードを選択状態として追加する
   * 編集モード中にのみ有効で、2つ選ばれたら AND/OR グループとしてまとめる
   */
  const handleSelectItem = (node: Node) => {
    if (node.type === "block") {
      if (!isEditMode || selectedItems.includes(node)) return;

      const newSel = [...selectedItems, node];

      setSelectedItems(newSel);

      if (newSel.length === 2) {
        if (calculation === "") { return }

        const children = newSel.map(node => ({ ...node }));
        console.log(children)
        setRootNodes(prev =>
          [
            ...prev.filter(n => !newSel.includes(n)), // 選択した Node を削除
            { type: "group", groupType: calculation, children } // 新しいグループ
          ]
        );
        setIsEditMode(false);
        setSelectedItems([]);
        // 親にペア選択完了を通知 => stidを表示してもらう
        onPairSelected(newSel[0], newSel[1], calculation);
      }
    }
  };

  return {
    rootNodes,
    addNode,
    handleSelectItem,
    startEdit,
  };

}
