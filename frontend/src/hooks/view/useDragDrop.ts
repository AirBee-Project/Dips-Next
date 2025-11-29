/**
 * ドラッグ＆ドロップ操作を扱うためのカスタムフック
 *
 * @param onDropItem - ドロップ時に呼び出されるコールバック。ドロップされた要素の id を受け取る
 * @returns ドラッグ,ドロップ用イベントハンドラー
 */
export function useDragDrop({
  onDropItem,
}: {
  onDropItem: (id: string) => void;
}) {
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer?.getData("text/plain");
    if (id) onDropItem(id);
  };

  /**
   * preventDefault() を呼ぶと dropイベントが発火する
   */
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  /**
   * ドラッグ開始時のイベント
   * ノードの indexを dataTransferに保存し、drop側で参照できるようにする
   */
  const handleDragStart = (e: DragEvent, index: number) => {
    e.dataTransfer?.setData("dragIndex", index.toString());
  };

  return { handleDrop, handleDragOver, handleDragStart };
}
