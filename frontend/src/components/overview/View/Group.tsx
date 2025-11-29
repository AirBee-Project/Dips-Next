import React from "react";

type AssetItem = { id: string };
type GroupType = "AND" | "OR" | "NOT";

type Props = {
  groupId: string;
  type: GroupType;
  items: AssetItem[];
  onCycleType: (groupId: string) => void;
  onDeleteGroup: (groupId: string) => void;
  onDeleteAsset: (groupId: string, assetId: string) => void;
  onDropToGroup: (e: React.DragEvent<HTMLDivElement>, groupId: string) => void;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    groupId: string,
    index: number
  ) => void;
  onDropOnItem: (
    e: React.DragEvent<HTMLDivElement>,
    targetGroupId: string,
    targetIndex: number
  ) => void;
};

export default function GroupComponent({
  groupId,
  type,
  items,
  onCycleType,
  onDeleteGroup,
  onDeleteAsset,
  onDropToGroup,
  onDragStart,
  onDropOnItem,
}: Props) {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  return (
    <div
      onDrop={(e) => onDropToGroup(e, groupId)}
      onDragOver={handleDragOver}
      className="border-2 border-dashed p-2 rounded bg-gray-50"
    >
      <div className="flex justify-between items-center mb-2">
        <span>Group ({type})</span>
        <div className="flex gap-2">
          <button
            className="text-sm px-2 py-1 border rounded"
            onClick={() => onCycleType(groupId)}
          >
            切替
          </button>
          <button
            className="text-sm px-2 py-1 border rounded text-red-500"
            onClick={() => onDeleteGroup(groupId)}
          >
            削除
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => onDragStart(e, groupId, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDropOnItem(e, groupId, index)}
            className="bg-white p-1 border rounded flex justify-between items-center cursor-grab"
          >
            <span>{item.id}</span>
            <button
              className="text-red-500 text-sm px-1"
              onClick={() => onDeleteAsset(groupId, item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
