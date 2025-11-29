// import React from "react";
// import type { Node } from "./types";
// import BlockNode from "./Block";

// type Props = {
//   node: Extract<Node, { type: "group" }>;
//   setNode: (newNode: Node) => void;
// };

// export default function GroupNode({ node, setNode }: Props) {
//   const toggleGroupType = () => {
//     setNode({
//       ...node,
//       groupType: node.groupType === "AND" ? "OR" : "AND",
//     });
//   };

//   const updateChild = (index: number, newChild: Node) => {
//     const updated = [...node.children];
//     updated[index] = newChild;
//     setNode({ ...node, children: updated });
//   };

//   const deleteChild = (index: number) => {
//     const updated = node.children.filter((_, i) => i !== index);
//     setNode({ ...node, children: updated });
//   };

//   return (
//     <div className="border p-2 rounded bg-gray-50 mt-2">
//       {/* ヘッダー */}
//       <div className="flex justify-between items-center mb-2">
//         <span className="font-semibold">Group ({node.groupType})</span>

//         <button
//           className="px-2 py-1 border rounded text-sm"
//           onClick={toggleGroupType}
//         >
//           切替
//         </button>
//       </div>

//       {/* 子ノードたち */}
//       <div className="flex flex-col gap-2 ml-4">
//         {node.children.map((child, index) => (
//           <div key={index} className="relative">
//             {child.type === "block" ? (
//               <BlockNode
//                 node={child}
//                 setNode={(newChild: Node) => updateChild(index, newChild)}
//               />
//             ) : (
//               <GroupNode
//                 node={child}
//                 setNode={(newChild) => updateChild(index, newChild)}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
