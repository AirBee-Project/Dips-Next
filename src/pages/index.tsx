import { useState } from "react";
import Menu from "../components/common/Menu/Menu";
import Select from "../components/index/Select/Select";
import { DndContext, DragOverlay } from "@dnd-kit/core";

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [width, setWidth] = useState(200);
  const [droppedItems, setDroppedItems] = useState<string[]>([]);

  // ドラッグ終了時に呼ばれる
  const handleDragEnd = (event: any) => {
    const { over, active } = event;

    // over が null の場合はドロップ先が存在しない
    if (over && over.id === "operation-area") {
      setDroppedItems((prev) => {
        // 同じアイテムを重複登録しないようにする例
        if (prev.includes(active.id)) return prev;
        return [...prev, active.id];
      });
    }
  };

  return (
    <div className="flex">
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* ドラッグアンドドロップが可能なエリア */}
      <DndContext onDragEnd={handleDragEnd}>
        <Select isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </DndContext>
    </div>
  );
}
