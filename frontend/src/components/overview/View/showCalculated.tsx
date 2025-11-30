import { Color } from "cesium";
import { type Calculation } from "../../../context/Kasane";
import { useSpaceTimeID, type SpaceTimeID, type SpaceTimeIDCollection } from "../../../context/SpaceTimeID";
import type { CheckBoxItems } from "./BlockDetail/types";

// 元のデータの型　要変更
type CheckBoxJson = Record<
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
 * @property {CheckBoxJson} value1 - 計算対象データ1
 * @property {CheckBoxJson} value2 - 計算対象データ2
 * @property {CheckBoxItems} rule - 
 */
export type ShowStidParams = {
  addCollection: (collection: {
    id: string;
    spaceTimeIDs: SpaceTimeID[];
    style: { color: any; alpha: number; outlineColor: any };
    visible: boolean;
  }) => void;
  removeCollection: (collectionId: string) => void;
  updateCollection: (
    collectionId: string,
    updates: Partial<{
      id: string;
      spaceTimeIDs: SpaceTimeID[];
      style: { color: any; alpha: number; outlineColor: any };
      visible: boolean;
    }>
  ) => void;
  getVisibleCollections: () => SpaceTimeIDCollection[];
  processCalculation: (formula: Calculation) => SpaceTimeID[] | Record<string, SpaceTimeID[]>;

  stid_set_id: string;
  calculation: "AND" | "OR" | "";
  value1: CheckBoxJson;
  value2: CheckBoxJson;
  // rule: CheckBoxItems
  rule1: CheckBoxItems; // 👈 value1用
  rule2: CheckBoxItems;
};

/**
 * WeatherJson を SpaceTimeID[] に変換する
 *
 * @param {CheckBoxJson} json - 入力となる気象データ JSON
 * @param {string[]} keys - 抽出対象となる気象キー（例: ["晴れ", "雨"]）
 * @returns {SpaceTimeID[]} SpaceTimeID 配列
 */
const parseSelectJson = (json: CheckBoxJson, keys: string[]): SpaceTimeID[] =>
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

// const { addCollection, removeCollection, updateCollection, getVisibleCollections } = useSpaceTimeID();

/**
 * STID セットの可視化
 * WeatherJson → SpaceTimeID に変換 → 計算 → コレクション登録の流れを行う
 *
 * @param {ShowStidParams} params - 実行に必要なパラメータ
 * @returns {void}
 */
export const showStid = ({
  addCollection,
  removeCollection,
  updateCollection,
  getVisibleCollections,
  processCalculation,

  stid_set_id,
  calculation,
  value1,
  value2,
  // rule,
  rule1,
  rule2
}: ShowStidParams) => {
  if (calculation === "") return;

  removeCollection(stid_set_id);
  const checkedNames1 = rule1.filter(i => i.checked).map(i => i.name);
  const checkedNames2 = rule2.filter(i => i.checked).map(i => i.name);


  console.log(checkedNames1)
  console.log(checkedNames2)
  // console.log(value1)
  // console.log(value2)

  const formula: Calculation = {
    type: calculation,
    // value1: {
    //   type: "IDs",
    //   value: parseSelectJson(value1, checkedNames),
    // },
    // value2: {
    //   type: "IDs",
    //   value: parseSelectJson(value2, checkedNames),
    // },
    value1: {
      type: "IDs",
      value: parseSelectJson(value1, rule1.filter(i => i.checked).map(i => i.name)),
    },
    value2: {
      type: "IDs",
      value: parseSelectJson(value2, rule2.filter(i => i.checked).map(i => i.name)),
    },
  };
  console.log(formula)
  const result = processCalculation(formula);
  const stids = extractIds(result);
  console.log(stids)
  if (stids.length === 0) {
    removeCollection("stid_set_id");
    // console.log(stid_set_id);
    console.log()
    console.log("remove!!!!!")
    console.log(getVisibleCollections());
    return
  }
  addCollection({
    id: "stid_set_id",
    // id: stid_set_id,
    spaceTimeIDs: stids,
    style: {
      color: Color.AQUA,
      alpha: 0.5,
      outlineColor: Color.BLACK,
    },
    visible: true,
  });
  console.log(getVisibleCollections());

  // updateCollection(stid_set_id, {
  //   id: stid_set_id,
  //   spaceTimeIDs: stids,
  //   style: {
  //     color: Color.AQUA,
  //     alpha: 0.5,
  //     outlineColor: Color.BLACK,
  //   },
  //   visible: true,
  // })
};
