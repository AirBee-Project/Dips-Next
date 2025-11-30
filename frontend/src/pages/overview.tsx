import { useEffect } from "react";
import Select from "../components/overview/Select/Select";
import { useMap } from "../context/Map";
import View from "../components/overview/View/View";
import { useSpaceTimeID, type SpaceTimeID } from "../context/SpaceTimeID";
import { Color } from "cesium";

export default function Overview() {
  // const { addCollection, focusCameraOnCollection } = useSpaceTimeID();
  const { viewerRef } = useMap();

  //テストでID群を表示

  // useEffect(() => {
  //   let ids: SpaceTimeID[] = [];

  //   for (let x = 0; x < 10; x++) {
  //     for (let y = 0; y < 100; y++) {
  //       ids.push({ z: 10, f: 5, x, y: y + 100 });
  //     }
  //   }

  //   addCollection({
  //     id: "my-collection",
  //     spaceTimeIDs: ids,
  //     style: { color: Color.AQUA, alpha: 0.5, outlineColor: Color.BLACK },
  //     visible: true,
  //   });
  // }, []);

  return (
    <div className="flex overflow-x-hidden">
      <div className="flex z-10">
        <Select />
        <View />
      </div>
    </div>
  );
}
