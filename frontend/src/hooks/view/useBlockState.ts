import { type Node } from "../../components/overview/View/Node"
import { useCallback } from "react";
import { showStid } from "../../components/overview/View/showCalculated";


/**
 * チェックボックスの変更を監視し、showStid を呼び出すカスタムフック
 *
 * @param node - 現在のノード
 * @param addCollection - SpaceTimeID コンテキストから取得する関数
 * @param processCalculation - Kasane コンテキストから取得する関数
 * @returns チェックボックスが変更されたときに呼び出すコールバック
 */
export function useCheckBoxChange({
  node,
  addCollection,
  processCalculation,
}: {
  node: Node;
  addCollection: any;
  processCalculation: any;
}) {
  return useCallback(
    (checkedItems: { name: string; checked: boolean }[]) => {
      if (node.type !== "block") {
        return;
      }

      // showStid({
      //   addCollection,
      //   processCalculation,
      //   stid_set_id: node.id,
      //   calculation: "checkbox_change",
      //   value1: checkedItems,
      //   value2: null,
      // });
    },
    [node, addCollection, processCalculation]
  );
}