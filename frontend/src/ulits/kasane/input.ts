import type { SpaceTimeID } from "../../context/SpaceTimeID";
import type { Coordinates } from "../cesium/drawVoxels";

export type Calculation =
  | { type: "AND"; value: Calculation[] }
  | { type: "OR"; value: Calculation[] }
  | { type: "IDs"; value: SpaceTimeID[] };

function route(
  ban: Calculation[],
  start: Coordinates,
  end: Coordinates
): SpaceTimeID[] {
  return [];
}
