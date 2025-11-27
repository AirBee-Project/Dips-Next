// --- 型定義 ---

export type Plateau3DTile = {
  url: string;

  // 地理情報
  pref_code: number;
  pref_name: string;
  city_code?: number;
  city_name?: string;
  ward_code?: number;
  ward_name?: string;

  // データ詳細
  type: string;
  name: string;
  lod?: number;
  texture?: boolean;
  year: number;
  registration_year: number;
  spec: number;
  format: "3DTiles" | "MVT";
  layers?: string[];
};

import rawData from "./Plateau3DTails.json";

export const plateauDataList: Plateau3DTile[] = rawData as Plateau3DTile[];
