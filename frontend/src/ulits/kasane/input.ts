import type { SpaceTimeID } from "../../context/SpaceTimeID";
import type { Coordinates } from "../cesium/drawVoxels";

export type Calculation =
  | { type: "AND"; value1: Calculation[]; value2: Calculation[] }
  | { type: "OR"; value1: Calculation[]; value2: Calculation[] }
  | { type: "IDs"; value: SpaceTimeID[] };

function route(
  ban: Calculation[],
  start: Coordinates,
  end: Coordinates
): SpaceTimeID[] {
  return [];
}
