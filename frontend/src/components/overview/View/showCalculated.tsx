import { Color } from "cesium";
import { useKasane, type Calculation } from "../../../context/Kasane"
import { useSpaceTimeID, type SpaceTimeID } from "../../../context/SpaceTimeID"

export type ShowStidParams = {
  addCollection: (collection: {
    id: string;
    spaceTimeIDs: SpaceTimeID[];
    style: { color: any; alpha: number; outlineColor: any };
    visible: boolean;
  }) => void;
  processCalculation: (formula: any) => SpaceTimeID[];
  stid_set_id: string;
  calculation: string;
  // value1: SpaceTimeID[];
  // value2: SpaceTimeID[];
  value1: WeatherJson;
  value2: WeatherJson;
};

export const showStid = ({
  addCollection,
  processCalculation,
  stid_set_id,
  calculation,
  value1,
  value2,
}: ShowStidParams) => {
  // const { addCollection, focusCameraOnCollection } = useSpaceTimeID();
  // const { processCalculation, isReady } = useKasane();

  // if (!isReady) return <div>WASM initializing...</div>;

  const formula = {
    type: calculation,
    value1: {
      type: "IDs",
      value: parseWeatherJson(value1, ["晴れ", "雨"]),
    },
    value2: {
      type: "IDs",
      value: parseWeatherJson(value2, ["晴れ", "雨"]),
    },
  };

  console.log(formula)
  const result_ids = processCalculation(formula as any);
  const stids: SpaceTimeID[] = Array.isArray(result_ids)
    ? (result_ids as SpaceTimeID[])
    : (Object.values(result_ids)[0] as SpaceTimeID[]);
  console.log(Array.isArray(result_ids))
  console.log(result_ids)
  console.log(Array.isArray(stids))
  console.log(stids)
  addCollection({
    id: stid_set_id,
    spaceTimeIDs: stids,
    style: { color: Color.AQUA, alpha: 0.5, outlineColor: Color.BLACK },
    visible: true,
  });
}

// 元データの型
type WeatherJson = Record<string, { z: number; f: number; x: number; y: number }[]>;

/**
 * JSONデータを SpaceTimeID 配列に変換する
 * @param json 元の JSON データ
 * @param keys 使用するキー配列。例: ["晴れ", "雨"]
 */
const parseWeatherJson = (json: WeatherJson, keys: string[]): SpaceTimeID[] => {
  const result: SpaceTimeID[] = [];
  keys.forEach(key => {
    const items = json[key];
    if (!items) return;
    items.forEach(item => {
      result.push({
        z: item.z,
        f: item.f,
        x: item.x,
        y: item.y
      });
    });
  });
  return result;
};