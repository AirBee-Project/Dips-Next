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
  format: string;
  layers?: string[];
};

// --- データの読み込み ---

// tsconfig.json で "resolveJsonModule": true が必要です
import rawData from "./Plateau3DTails.json";

// JSONデータを型付きの変数としてエクスポート
export const plateauDataList: Plateau3DTile[] = rawData as Plateau3DTile[];

// --- 使用例 ---

// 特定のURLのデータを検索
export const findByUrl = (url: string): Plateau3DTile | undefined => {
  return plateauDataList.find((item) => item.url === url);
};

// 東京都のデータだけ抽出
export const getTokyoData = (): Plateau3DTile[] => {
  return plateauDataList.filter((item) => item.pref_name === "東京都");
};
