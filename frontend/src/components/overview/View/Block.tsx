// import { useState } from "react";
// import type { DroppedItem } from "./View"

// type BlockProps = {
//   item: DroppedItem;
//   index: number;
//   onSelect: (id: string) => void;
//   onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
//   onDropOnItem: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
// };

// export default function BlockNode({
//   item,
//   index,
//   onSelect,
//   onDragStart,
//   onDropOnItem,
// }: BlockProps) {
//   return (
//     <div
//       key={item.id}
//       draggable
//       onDragStart={(e) => onDragStart(e, index)}
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={(e) => onDropOnItem(e, index)}
//       onClick={() => onSelect(item.id)}
//       className="border p-2 rounded bg-gray-100 cursor-grab active:cursor-grabbing"
//     >
//       {item.id}
//     </div>
//   );
// }

// import React from "react";
// import type { Node } from "./types";

// type Props = {
//   node: Extract<Node, { type: "block" }>;
//   setNode: (newNode: Node) => void;
// };

// export default function BlockNode({ node }: Props) {
//   return (
//     <div className="border p-2 rounded bg-white">
//       {node.id}
//     </div>
//   );
// }


import React from "react";
import type { DroppedItem } from "./View";

type BlockProps = {
  item: DroppedItem;
  index: number;
  onSelect: (id: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  // onDropOnItem: (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => void;
};

const Block: React.FC<BlockProps> = ({
  item,
  index,
  onSelect,
  onDragStart,
  // onDropOnItem,
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      // onDrop={(e) => onDropOnItem(e, index,)}
      onDragOver={(e) => e.preventDefault()}
      // onClick={() => onSelect(item.id)}
      onClick={() => console.log("hihi")}

      className="p-2 border rounded bg-gray-1 cursor-pointer hover:bg-gray-200 select-none"
    >
      {item.id}
    </div>
  );
};

export default Block;
