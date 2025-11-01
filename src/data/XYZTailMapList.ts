type XYZTileMap = {
  id: number;
  name: string;
  XYZUrl: string;
  sampleUrl: string;
  detailText?: string;
  detailUrl?: string;
  credit?: string;
};

export const XYZTileMapList: Record<number, XYZTileMap> = {
  1: {
    id: 1,
    name: "標準地図",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/std/11/1817/808.png",
  },
  2: {
    id: 2,
    name: "淡色地図",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/pale/11/1817/808.png",
  },
  3: {
    id: 3,
    name: "標準地図（英語）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/english/11/1817/808.png",
  },
  4: {
    id: 4,
    name: "土地の成り立ち・土地利用",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/lcm25k_2012/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/lcm25k_2012/11/1817/808.png",
  },
};
