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
  天気予報3: {
    key_type: "text",
    json_url: "/SpaceTimeID/test.json",
    detail: "テキストテキストテキストテキストテキストテキスト",
  },
  天気予報4: {
    key_type: "text",
    json_url: "/SpaceTimeID/test.json",
    detail: "テキストテキストテキストテキストテキストテキスト",
  },
  天気予報5: {
    key_type: "text",
    json_url: "/SpaceTimeID/test.json",
    detail: "テキストテキストテキストテキストテキストテキスト",
  },
  links_1: {
    key_type: "text",
    json_url: "/SpaceTimeID/links_a.json",
    detail: "テキストテキストテキストテキストテキストテキスト",
  },
  障害物: {
    key_type: "text",
    json_url: "/SpaceTimeID/obstacle.json",
    detail: "テキストテキストテキストテキストテキストテキスト",
  },
  太い線: {
    key_type: "text",
    json_url: "/SpaceTimeID/vline.json",
    detail: "テキストテキストテキストテキストテキストテキスト",
  },

};
