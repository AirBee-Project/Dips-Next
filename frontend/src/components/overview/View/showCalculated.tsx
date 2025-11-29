import { Color } from "cesium";
import { type Calculation } from "../../../context/Kasane";
import { type SpaceTimeID } from "../../../context/SpaceTimeID";

// 元のデータの型　要変更
type WeatherJson = Record<
  string,
  { z: number; f: number; x: number; y: number }[]
>;

/**
 * showStid で使用されるパラメータ
 * @typedef {Object} ShowStidParams
 * @property {(collection: {
 *    id: string;
 *    spaceTimeIDs: SpaceTimeID[];
 *    style: { color: any; alpha: number; outlineColor: any };
 *    visible: boolean;
 *  }) => void} addCollection - STID の結果をビューに追加する処理
 * @property {(formula: Calculation) => SpaceTimeID[] | Record<string, SpaceTimeID[]>} processCalculation - WASM による STID 計算関数
 * @property {string} stid_set_id - コレクション登録時の ID
 * @property {"AND" | "OR" | ""} calculation - 計算タイプ（AND / OR）
 * @property {WeatherJson} value1 - 計算対象データ1
 * @property {WeatherJson} value2 - 計算対象データ2
 */
export type ShowStidParams = {
  addCollection: (collection: {
    id: string;
    spaceTimeIDs: SpaceTimeID[];
    style: { color: any; alpha: number; outlineColor: any };
    visible: boolean;
  }) => void;

  processCalculation: (formula: Calculation) => SpaceTimeID[] | Record<string, SpaceTimeID[]>;

  stid_set_id: string;
  calculation: "AND" | "OR" | "";
  value1: WeatherJson;
  value2: WeatherJson;
};

/**
 * WeatherJson を SpaceTimeID[] に変換する
 *
 * @param {WeatherJson} json - 入力となる気象データ JSON
 * @param {string[]} keys - 抽出対象となる気象キー（例: ["晴れ", "雨"]）
 * @returns {SpaceTimeID[]} SpaceTimeID 配列
 */
const parseWeatherJson = (json: WeatherJson, keys: string[]): SpaceTimeID[] =>
  keys.flatMap(key =>
    json[key]?.map(item => ({
      z: item.z,
      f: item.f,
      x: item.x,
      y: item.y,
    })) ?? []
  );

/**
 * 計算結果を配列にする関数
 *
 * @param {SpaceTimeID[] | Record<string, SpaceTimeID[]>} result - 計算結果
 * @returns {SpaceTimeID[]} 抽出された SpaceTimeID 配列
 */
const extractIds = (
  result: SpaceTimeID[] | Record<string, SpaceTimeID[]>
): SpaceTimeID[] => {
  if (Array.isArray(result)) return result;
  const firstKey = Object.keys(result)[0];
  return result[firstKey] ?? [];
};

/**
 * STID セットの可視化
 * WeatherJson → SpaceTimeID に変換 → 計算 → コレクション登録の流れを行う
 *
 * @param {ShowStidParams} params - 実行に必要なパラメータ
 * @returns {void}
 */
export const showStid = ({
  addCollection,
  processCalculation,
  stid_set_id,
  calculation,
  value1,
  value2,
}: ShowStidParams) => {
  if (calculation === "") return;

  const formula: Calculation = {
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

  const result = processCalculation(formula);
  const stids = extractIds(result);

  addCollection({
    id: stid_set_id,
    spaceTimeIDs: stids,
    style: {
      color: Color.AQUA,
      alpha: 0.5,
      outlineColor: Color.BLACK,
    },
    visible: true,
  });
};
