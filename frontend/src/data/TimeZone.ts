type TimeZone = {
  id: string;
  name: string;
};

export const TimeZoneList: Record<string, TimeZone> = {
  "Asia/Tokyo": { id: "Asia/Tokyo", name: "日本標準時" },
  UTC: { id: "UTC", name: "協定世界時" },
  "Etc/GMT+12": { id: "Etc/GMT+12", name: "GMT−12:00" },
  "Etc/GMT+11": { id: "Etc/GMT+11", name: "GMT−11:00" },
  "Pacific/Midway": { id: "Pacific/Midway", name: "サモア標準時" },
  "America/Adak": { id: "America/Adak", name: "ハワイ‐アリューシャン標準時" },
  "Pacific/Honolulu": { id: "Pacific/Honolulu", name: "ハワイ標準時" },
  "America/Anchorage": { id: "America/Anchorage", name: "アラスカ標準時" },
  "America/Los_Angeles": { id: "America/Los_Angeles", name: "太平洋標準時" },
  "America/Denver": { id: "America/Denver", name: "山岳部標準時" },
  "America/Chicago": { id: "America/Chicago", name: "中部標準時" },
  "America/New_York": { id: "America/New_York", name: "東部標準時" },
  "America/Sao_Paulo": { id: "America/Sao_Paulo", name: "ブラジル標準時" },
  "Atlantic/Reykjavik": { id: "Atlantic/Reykjavik", name: "グリニッジ標準時" },
  "Europe/London": { id: "Europe/London", name: "グリニッジ標準時" },
  "Europe/Paris": { id: "Europe/Paris", name: "中央ヨーロッパ時間" },
  "Europe/Berlin": { id: "Europe/Berlin", name: "中央ヨーロッパ時間" },
  "Europe/Moscow": { id: "Europe/Moscow", name: "モスクワ時間" },
  "Asia/Dubai": { id: "Asia/Dubai", name: "湾岸標準時" },
  "Asia/Karachi": { id: "Asia/Karachi", name: "パキスタン標準時" },
  "Asia/Kolkata": { id: "Asia/Kolkata", name: "インド標準時" },
  "Asia/Dhaka": { id: "Asia/Dhaka", name: "バングラデシュ標準時" },
  "Asia/Bangkok": { id: "Asia/Bangkok", name: "タイ標準時" },
  "Asia/Shanghai": { id: "Asia/Shanghai", name: "中国標準時" },
  "Asia/Seoul": { id: "Asia/Seoul", name: "韓国標準時" },
  "Australia/Adelaide": {
    id: "Australia/Adelaide",
    name: "オーストラリア中部標準時",
  },
  "Australia/Sydney": {
    id: "Australia/Sydney",
    name: "オーストラリア東部標準時",
  },
  "Pacific/Auckland": {
    id: "Pacific/Auckland",
    name: "ニュージーランド標準時",
  },
  "Pacific/Tongatapu": { id: "Pacific/Tongatapu", name: "トンガ標準時" },
};
