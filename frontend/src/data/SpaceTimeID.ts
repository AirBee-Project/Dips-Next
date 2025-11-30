export type SpaceTimeIDData = {
  key_type: "float" | "int" | "text" | "boolean";
  json_url: string;
  detail?: string;
  update_date?: string;
  owner?: string;
};

//空間IDのデータ一覧を管理する
export const SpaceTimeIDDataList: Record<string, SpaceTimeIDData> = {
  テスト: {
    key_type: "text",
    json_url: "/SpaceTimeID/test.json",
    detail: "テスト用の空間ID群",
  },
  障害物: {
    key_type: "text",
    json_url: "/SpaceTimeID/obstacle.json",
    detail: "集合演算の障害物",
  },
  太い線: {
    key_type: "text",
    json_url: "/SpaceTimeID/vline.json",
    detail: "集合演算の線部分",
  },
  関西国際空港: {
    key_type: "text",
    json_url: "/SpaceTimeID/kankuu2.json",
    detail: "大阪国際空港",
  },
  大阪ヘリポート: {
    key_type: "text",
    json_url: "/SpaceTimeID/1.json",
    detail: "大阪ヘリポート",
  },
};
