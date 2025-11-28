export type SpaceTimeIDData = {
  key_type: "float" | "int" | "text" | "boolean";
  json_url: string;
  detail?: string;
  update_date?: string;
  owner?: string;
};

export const SpaceTimeIDDataList: Record<string, SpaceTimeIDData> = {
  天気予報: {
    key_type: "text",
    json_url: "",
    detail: "テキストテキストテキストテキストテキストテキスト",
  },
  天気予報2: {
    key_type: "text",
    json_url: "",
    detail: "テキストテキストテキストテキストテキストテキスト",
  },
};
