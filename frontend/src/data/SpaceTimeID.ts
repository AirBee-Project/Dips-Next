export type SpaceTimeIDData = {
  key_type: "float" | "int" | "text" | "boolean";
  json_url: string;
  detail?: string;
  update_date?: string;
  owner?: string;
};

//空間IDのデータ一覧を管理する
export const SpaceTimeIDDataList: Record<string, SpaceTimeIDData> = {
  天気予報: {
    key_type: "text",
    json_url: "/SpaceTimeID/test.json",
    detail: "テキストテキストテキストテキストテキストテキスト",
  },
  天気予報2: {
    key_type: "text",
    json_url: "/SpaceTimeID/test.json",
    detail: "テキストテキストテキストテキストテキストテキスト",
  },
};
