import React from "react";
import type { DroppedItem } from "./View";

type BlockProps = {
  item: DroppedItem;
  index: number;
  onSelect: (id: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  // onDropOnItem: (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => void;
};

/**
 * 最も基礎的なNode
 */
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
      onClick={() => onSelect(item.id)}

      className="p-2 border rounded bg-gray-1 cursor-pointer hover:bg-gray-200 select-none"
    >
      {item.id}
    </div>
  );
};

export default Block;
