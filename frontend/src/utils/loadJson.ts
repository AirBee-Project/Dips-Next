import { SpaceTimeIDDataList } from "../data/SpaceTimeID";

export async function loadJson(id: string) {
  const item = SpaceTimeIDDataList[id];
  if (!item?.json_url) return null;

  try {
    const res = await fetch(item.json_url);
    return await res.json();
  } catch (err) {
    console.error("JSON読み込みエラー:", err);
    return null;
  }
}
