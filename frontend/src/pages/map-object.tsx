import { useEffect } from "react";
import { useMap } from "../context/Map";
import MapObjectList from "../components/map-object/MapObjectList"; // 子コンポーネント
import MapLayersList from "../components/map-object/MapLayersList";

export default function MapObject() {
  const { setMapVisible, viewerRef } = useMap();

  useEffect(() => {
    setMapVisible(true);
    const viewer = viewerRef.current;
    if (!viewer) return;
    viewer.resize();
    viewer.scene.requestRender();
  }, [setMapVisible, viewerRef]);

  return (
    <div className="flex overflow-x-hidden w-full h-full z-[9999]">
      <div className="flex z-10">
        <MapObjectList />
        <MapLayersList />
      </div>
    </div>
  );
}