import { useEffect } from "react";
import Select from "../components/overview/Select/Select";
import { useMap } from "../context/Map";
import View from "../components/overview/View/View";
import { useSpaceTimeID } from "../context/SpaceTimeID";
import { Color } from "cesium";

export default function Overview() {
  const { addCollection, focusCameraOnCollection } = useSpaceTimeID();
  const { viewerRef } = useMap();

  //テストでID群を表示

  useEffect(() => {
    addCollection({
      id: "my-collection",
      spaceTimeIDs: [
        { z: 10, f: 5, x: 512, y: 512 },
        { z: 10, f: 5, x: 513, y: 512 },
        { z: 10, f: 5, x: 514, y: 512 },
      ],
      style: { color: Color.AQUA, alpha: 0.5, outlineColor: Color.AZURE },
      visible: true,
    });

    addCollection({
      id: "my-collection-2",
      spaceTimeIDs: [
        { z: 10, f: 7, x: 512, y: 512 },
        { z: 10, f: 7, x: 513, y: 512 },
        { z: 10, f: 7, x: 514, y: 512 },
      ],
      style: { color: Color.AQUA, alpha: 0.5, outlineColor: Color.AZURE },
      visible: true,
    });
  }, []);

  return (
    <div className="flex overflow-x-hidden">
      <div className="flex z-10">
        <Select />
        <View />
      </div>
    </div>
  );
}
