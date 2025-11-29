import { useState } from "react";
import type { Node } from "../../components/overview/View/types"

/**
 * ビューツリー(Node全体)の構築・選択・編集モード管理を行うカスタムフック
 *
 * @param onPairSelected - AND,ORで2つのノードが選択された際に呼ばれるコールバック
 *                         (idA, idB, calculationType) の形式で通知される。
 */
export function useViewTree({ onPairSelected }: { onPairSelected: (a: string, b: string, calculation: "AND" | "OR") => void }) {
  // 表示中のツリー構造のnode
  const [rootNodes, setRootNodes] = useState<Node[]>([]);
  // 編集モード中にユーザーが選択したアイテムID
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
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
    setRootNodes((prev: any) => [...prev, { type: "block", id }]);
  };

  /**
   * ノードを選択状態として追加する
   * 編集モード中にのみ有効で、2つ選ばれたら AND/OR グループとしてまとめる
   */
  const handleSelectItem = (id: string) => {
    if (!isEditMode || selectedItems.includes(id)) return;

    const newSel = [...selectedItems, id];
    setSelectedItems(newSel);

    if (newSel.length === 2) {
      if (calculation === "") { return }
      // 親にペア選択完了を通知 => stidを表示してもらう
      onPairSelected(newSel[0], newSel[1], calculation);
      const children = newSel.map(id => ({ type: "block", id }));
      setRootNodes((prev: any) => [...prev, { type: "group", groupType: calculation, children }]);
      setIsEditMode(false);
      setSelectedItems([]);
    }
  };

  return {
    rootNodes,
    addNode,
    handleSelectItem,
    startEdit,
  };
}
