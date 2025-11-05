import { useEffect } from "react";
import { useMap } from "../context/Map";

export default function MapObject() {
  const { setMapVisible, viewerRef } = useMap();

  useEffect(() => {
    setMapVisible(true); // 表示

    const viewer = viewerRef.current;
    if (!viewer) return;

    // 🔹 ここが重要
    viewer.resize(); // canvasサイズ再計算
    viewer.scene.requestRender(); // 描画
  }, [setMapVisible, viewerRef]);

  return <div className="flex overflow-x-hidden"></div>;
}
