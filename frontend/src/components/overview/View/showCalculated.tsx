import { Color } from "cesium";
import { useKasane, type Calculation } from "../../../context/Kasane"
import { useSpaceTimeID, type SpaceTimeID } from "../../../context/SpaceTimeID"

export const showStid = (stid_set_id: string, calculation: string, value1: SpaceTimeID[], value2: SpaceTimeID[]) => {
  const { addCollection, focusCameraOnCollection } = useSpaceTimeID();
  const { processCalculation, isReady } = useKasane();

  if (!isReady) return <div>WASM initializing...</div>;

  const formula = {
    type: calculation,
    value1: {
      type: "IDs",
      value: value1,
    },
    value2: {
      type: "IDs",
      value: value2,
    },
  };

  const result_ids = processCalculation(formula as any);

  addCollection({
    id: stid_set_id,
    spaceTimeIDs: result_ids,
    style: { color: Color.AQUA, alpha: 0.5, outlineColor: Color.BLACK },
    visible: true,
  });
}