import type { CheckBoxItems } from "./BlockDetail/types";

export type Node =
  | {
    type: "block";
    id: string;
    order: number;
    rule: CheckBoxItems;
  }
  | {
    type: "group";
    groupType: "AND" | "OR";
    children: Node[];
  };

/**
* ツリー全体の最大 order を取得
*/
export function getMaxOrder(nodes: Node[]): number {
  let maxOrder = 0;

  function dfs(node: Node) {
    if (node.type === "block") {
      maxOrder = Math.max(maxOrder, node.order);
      return;
    }
    for (const child of node.children) {
      dfs(child);
    }
  }

  nodes.forEach(dfs);

  return maxOrder;
}

/**
 * 与えられた Node ツリー内の block の最小 order を返す
 * block が一つもない場合は Infinity を返す
 */
export function getMinOrder(node: Node): number {
  let minOrder = Infinity;

  function dfs(n: Node) {
    if (n.type === "block") {
      minOrder = Math.min(minOrder, n.order);
      return;
    }
    for (const child of n.children) {
      dfs(child);
    }
  }

  dfs(node);
  return minOrder;
}

/**
 * leafNode が属する直近の group ノードを返す。
 * 見つからなければ null。
 */
export function findParentGroupFromRootNodes(
  rootNodes: Node[],
  target: Node
): Extract<Node, { type: "group" }> | null {
  function dfs(
    current: Node,
    parentGroup: Extract<Node, { type: "group" }> | null
  ): Extract<Node, { type: "group" }> | null {

    if (current == target) {
      return parentGroup;
    }

    // if (
    //   current.type === "block" &&
    //   target.type === "block" &&
    //   current.id === target.id
    // ) {
    //   return parentGroup;
    // }

    if (current.type === "group") {
      for (const child of current.children) {
        const found = dfs(child, current);
        if (found) return found;
      }
    }

    return null;
  }

  for (const root of rootNodes) {
    const group = dfs(root, null);
    if (group) return group;
  }

  return null;
}