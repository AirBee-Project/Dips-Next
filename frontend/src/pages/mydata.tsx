import { useEffect } from "react";
import { useMap } from "../context/Map";
import xySpaceId from "../ulits/cesiumu/xySpaceID";

export default function MyData() {
  const { setMapVisible, viewerRef } = useMap();

  //最初にMapを非表示にする
  useEffect(() => {
    setMapVisible(true);

    const viewer = viewerRef.current;
    if (!viewer || viewer.isDestroyed()) return;

    xySpaceId(viewer, 8);
  }, [viewerRef.current]);

  return (
    <div className="flex overflow-x-hidden">
      <div className="flex z-10">
        <h1>MyData</h1>
      </div>
    </div>
  );
}
