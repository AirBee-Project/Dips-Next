export type Node =
  | {
    type: "block";
    id: string;
    order: number;
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