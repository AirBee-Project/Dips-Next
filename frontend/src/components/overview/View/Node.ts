// import BlockNode from "./Block";
// import GroupNode from "./Group";

// export type Node =
//   | {
//     type: "block";
//     id: string;
//   }
//   | {
//     type: "group";
//     groupType: "AND" | "OR";
//     children: Node[];
//   };

// const NodeRenderer = ({ node }: { node: Node }) => {
//   if (node.type === "block") return <BlockNode node={ node } />;
//   if (node.type === "group") return <GroupNode node={ node } />;
// }