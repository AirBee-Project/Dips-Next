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
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/std/18/232801/103215.png",
    detailText: "最も標準的な地図。電子地形図（タイル）。ズームレベル5-18。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#std",
    credit: "国土地理院",
  },
  2: {
    id: 2,
    name: "淡色地図",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/pale/18/232801/103215.png",
    detailText: "標準地図の色を薄くした地図。ズームレベル5-18。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#pale",
    credit: "国土地理院",
  },
  3: {
    id: 3,
    name: "標準地図（英語）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/english/10/909/403.png",
    detailText: "英語表記の地図。ズームレベル5-11。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#english",
    credit: "国土地理院",
  },
  4: {
    id: 4,
    name: "数値地図25000（土地条件）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/lcm25k_2012/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/lcm25k_2012/10/909/403.png",
    detailText: "地理院タイル（数値地図25000（土地条件））。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#lcm25k_2012",
    credit: "国土地理院",
  },
  5: {
    id: 5,
    name: "土地条件図（初期整備版）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/lcm25k/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/lcm25k/15/29137/12850.png",
    detailText: "地理院タイル（土地条件図）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#lcm25k",
    credit: "国土地理院",
  },
  6: {
    id: 6,
    name: "沿岸海域土地条件図（平成元年以降）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/ccm1/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/ccm1/15/28613/13028.png",
    detailText: "地理院タイル（沿岸海域土地条件図）。平成元年以降の整備図。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#ccm",
    credit: "国土地理院",
  },
  7: {
    id: 7,
    name: "沿岸海域土地条件図（昭和63年以前）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/ccm2/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/ccm2/15/28613/13028.png",
    detailText: "地理院タイル（沿岸海域土地条件図）。昭和63年以前の整備図。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#ccm",
    credit: "国土地理院",
  },
  8: {
    id: 8,
    name: "火山基本図",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/vbm/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/vbm/12/3626/1617.png",
    detailText: "地理院タイル（火山基本図）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#vbm",
    credit: "国土地理院",
  },
  9: {
    id: 9,
    name: "火山基本図データ（基図）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/vbmd_bm/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/vbmd_bm/16/58414/27610.png",
    detailText: "地理院タイル（火山基本図データ）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#vbmd_bm",
    credit: "国土地理院",
  },
  10: {
    id: 10,
    name: "火山基本図データ（陰影段彩図）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/vbmd_colorrel/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/vbmd_colorrel/16/58414/27610.png",
    detailText: "地理院タイル（火山基本図データ）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#vbmd_colorrel",
    credit: "国土地理院",
  },
  11: {
    id: 11,
    name: "火山基本図データ（写真地図）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/vbmd_pm/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/vbmd_pm/16/58414/27610.png",
    detailText: "地理院タイル（火山基本図データ）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#vbmd_pm",
    credit: "国土地理院",
  },
  12: {
    id: 12,
    name: "火山土地条件図",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/vlcd/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/vlcd/16/57987/25589.png",
    detailText: "地理院タイル（火山土地条件図）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#vlcd",
    credit: "国土地理院",
  },
  13: {
    id: 13,
    name: "20万分1土地利用図（1982～1983年）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/lum200k/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/lum200k/12/3662/1497.png",
    detailText: "20万分1土地利用図（1982～1983年）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#lum200k",
    credit: "国土地理院",
  },
  14: {
    id: 14,
    name: "湖沼図",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/lake1/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/lake1/15/28757/12965.png",
    detailText: "地理院タイル（湖沼図）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#lake",
    credit: "国土地理院",
  },
  15: {
    id: 15,
    name: "湖沼データ",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/lakedata/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/lakedata/16/58014/25848.png",
    detailText: "地理院タイル（湖沼データ）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#lakedata",
    credit: "国土地理院",
  },
  16: {
    id: 16,
    name: "白地図",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/blank/8/228/98.png",
    detailText: "白地図。ズームレベル5-14。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#blank",
    credit: "国土地理院",
  },
  17: {
    id: 17,
    name: "写真",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/16/58274/25716.jpg",
    detailText: "全国の最新空中写真をつなぎ合わせたシームレス画像。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#seamlessphoto",
    credit: "国土地理院",
  },
  18: {
    id: 18,
    name: "年度別空中写真（2023年度）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/nendophoto2023/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/nendophoto2023/16/57560/25743.png",
    detailText:
      "2007年度以降の空中写真を撮影年度ごとにまとめたもの。これは2023年度の例。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#nendo",
    credit: "国土地理院",
  },
  19: {
    id: 19,
    name: "年代別写真（1987年～1990年）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/gazo4/{z}/{x}/{y}.jpg",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/gazo4/16/58274/25716.jpg",
    detailText: "国土画像情報（第4期）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#gazo4",
    credit: "国土地理院",
  },
  20: {
    id: 20,
    name: "年代別写真（1984年～1986年）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/gazo3/{z}/{x}/{y}.jpg",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/gazo3/16/58274/25716.jpg",
    detailText: "国土画像情報（第3期）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#gazo3",
    credit: "国土地理院",
  },
  21: {
    id: 21,
    name: "年代別写真（1979年～1983年）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/gazo2/{z}/{x}/{y}.jpg",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/gazo2/16/58274/25716.jpg",
    detailText: "国土画像情報（第2期）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#gazo2",
    credit: "国土地理院",
  },
  22: {
    id: 22,
    name: "年代別写真（1974年～1978年）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/gazo1/16/58274/25716.jpg",
    detailText: "国土画像情報（第1期）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#gazo1",
    credit: "国土地理院",
  },
  23: {
    id: 23,
    name: "年代別写真（1961年～1969年）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/ort_old10/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/ort_old10/16/58261/25809.png",
    detailText: "空中写真（1961年～1969年）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#ort_old10",
    credit: "国土地理院",
  },
  24: {
    id: 24,
    name: "年代別写真（1945年～1950年）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/ort_USA10/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/ort_USA10/16/58261/25809.png",
    detailText: "米軍撮影の空中写真（1945年～1950年）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#ort_USA10",
    credit: "国土地理院",
  },
  25: {
    id: 25,
    name: "年代別写真（1936年～1942年頃）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/ort_riku10/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/ort_riku10/16/58212/25806.png",
    detailText: "陸軍撮影の空中写真（1936年～1942年頃）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#ort_riku10",
    credit: "国土地理院",
  },
  26: {
    id: 26,
    name: "年代別写真（1928年頃）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/ort_1928/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/ort_1928/16/57435/26028.png",
    detailText: "空中写真（1928年頃）。大阪市域。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#ort_1928",
    credit: "国土地理院",
  },
  27: {
    id: 27,
    name: "電子国土基本図（オルソ画像）（2007年～）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/ort/16/58274/25716.jpg",
    detailText: "電子国土基本図（オルソ画像）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#ort",
    credit: "国土地理院",
  },
  28: {
    id: 28,
    name: "簡易空中写真（2004年～）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/airphoto/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/airphoto/16/58274/25716.png",
    detailText: "航空レーザ測量の点検用等に撮影した写真。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#airphoto",
    credit: "国土地理院",
  },
  29: {
    id: 29,
    name: "全国ランドサットモザイク画像",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/lndst/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/lndst/9/455/201.png",
    detailText: "Landsat8画像（GSI,TSIC,GEO Grid/AIST）等によるモザイク画像。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#lndst",
    credit: "GSI, TSIC, GEO Grid/AIST, USGS, GEBCO",
  },
  30: {
    id: 30,
    name: "世界衛星モザイク画像",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/modis/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/modis/2/3/1.png",
    detailText: "MODIS衛星画像。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#modis",
    credit: "NASA LP DAAC, USGS/EROS",
  },
  31: {
    id: 31,
    name: "色別標高図",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/relief/7/113/50.png",
    detailText: "標高に応じて色分けした地図。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#relief",
    credit: "国土地理院, 海上保安庁海洋情報部",
  },
  32: {
    id: 32,
    name: "デジタル標高地形図（例: D1-No.865）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/d1-no865/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/d1-no865/11/1819/806.png",
    detailText:
      "航空レーザ測量データ等による高精細な標高地形図。URLの技術資料番号を指定。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#digiele",
    credit: "国土地理院",
  },
  33: {
    id: 33,
    name: "アナグリフ（カラー）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/anaglyphmap_color/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/anaglyphmap_color/12/3626/1617.png",
    detailText: "赤青メガネで立体視できる地図（カラー版）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#anaglyphmap",
    credit: "国土地理院",
  },
  34: {
    id: 34,
    name: "アナグリフ（グレー）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/anaglyphmap_gray/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/anaglyphmap_gray/12/3626/1617.png",
    detailText: "赤青メガネで立体視できる地図（グレー版）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#anaglyphmap",
    credit: "国土地理院",
  },
  35: {
    id: 35,
    name: "陰影起伏図",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/hillshademap/12/3626/1617.png",
    detailText: "地形の凹凸を陰影で表現した地図。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#hillshademap",
    credit: "国土地理院",
  },
  36: {
    id: 36,
    name: "陰影起伏図（全球版）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/2/3/1.png",
    detailText: "地球地図全球版標高第2版を基に算出した全球の陰影起伏図。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#earthhillshade",
    credit: "国土地理院",
  },
  37: {
    id: 37,
    name: "傾斜量図",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/slopemap/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/slopemap/12/3626/1617.png",
    detailText: "地形の傾斜の大きさを色分けした地図。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#slopemap",
    credit: "国土地理院",
  },
  38: {
    id: 38,
    name: "全国傾斜量区分図（雪崩関連）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/slopezone1map/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/slopezone1map/12/3626/1617.png",
    detailText: "雪崩が発生しやすいとされる傾斜（30～40度）を抽出した地図。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#slopezone1map",
    credit: "国土地理院",
  },
  39: {
    id: 39,
    name: "赤色立体地図",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/sekishoku/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/sekishoku/11/1767/834.png",
    detailText:
      "地形の起伏を赤色の濃淡で表した地図で、微地形を把握するのに適しています。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#sekishoku",
    credit: "国土地理院",
  },
  40: {
    id: 40,
    name: "活断層図（都市圏活断層図）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/afm/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/afm/14/14603/6305.png",
    detailText: "都市圏の活断層図。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#afm",
    credit: "国土地理院",
  },
  41: {
    id: 41,
    name: "火山土地条件図 数値データ（例: 雌阿寒岳）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/vlcd_meakan/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/vlcd_meakan/13/7372/2998.png",
    detailText:
      "火山地形分類データ。URLの(火山名)をローマ字（例: meakan）に置き換えて使用。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#vlcd_",
    credit: "国土地理院",
  },
  42: {
    id: 42,
    name: "治水地形分類図",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/lcmfc2/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/lcmfc2/14/14553/6438.png",
    detailText: "洪水や氾濫に関する地形を分類した地図。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#lcmfc2",
    credit: "国土地理院",
  },
  43: {
    id: 43,
    name: "明治期の低湿地",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/swale/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/swale/14/14553/6438.png",
    detailText:
      "迅速測図などから明治期の低湿地（水田、湿地など）を抽出した地図。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#swale",
    credit: "国土地理院",
  },
  44: {
    id: 44,
    name: "全国植生指標データ（例: 2012年8月）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/ndvi_250m_2012_08/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/ndvi_250m_2012_08/8/224/101.png",
    detailText: "植生の分布状況（NDVI）。URLの{西暦}_{月}を指定。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#ndvi_250m",
    credit: "国土地理院・東海大学",
  },
  45: {
    id: 45,
    name: "磁気図2020.0年値（偏角）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/jikizu2020_chijiki_d/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/jikizu2020_chijiki_d/7/113/50.png",
    detailText: "地磁気の偏角（2020.0年値）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#jikizu2020",
    credit: "国土地理院",
  },
  46: {
    id: 46,
    name: "磁気図2020.0年値（伏角）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/jikizu2020_chijiki_i/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/jikizu2020_chijiki_i/7/113/50.png",
    detailText: "地磁気の伏角（2020.0年値）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#jikizu2020",
    credit: "国土地理院",
  },
  47: {
    id: 47,
    name: "磁気図2020.0年値（全磁力）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/jikizu2020_chijiki_f/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/jikizu2020_chijiki_f/7/113/50.png",
    detailText: "地磁気の全磁力（2020.0年値）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#jikizu2020",
    credit: "国土地理院",
  },
  48: {
    id: 48,
    name: "磁気図2015.0年値（偏角）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/jikizu2015_chijiki_d/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/jikizu2015_chijiki_d/7/113/50.png",
    detailText: "地磁気の偏角（2015.0年値）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#jikizu2015",
    credit: "国土地理院",
  },
  49: {
    id: 49,
    name: "磁気図2015.0年値（伏角）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/jikizu2015_chijiki_i/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/jikizu2015_chijiki_i/7/113/50.png",
    detailText: "地磁気の伏角（2015.0年値）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#jikizu2015",
    credit: "国土地理院",
  },
  50: {
    id: 50,
    name: "磁気図2015.0年値（全磁力）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/jikizu2015_chijiki_f/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/jikizu2015_chijiki_f/7/113/50.png",
    detailText: "地磁気の全磁力（2015.0年値）。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#jikizu2015",
    credit: "国土地理院",
  },
  51: {
    id: 51,
    name: "森林（国有林）の空中写真",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/rinya/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/rinya/14/14515/6390.png",
    detailText: "林野庁が整備した森林（国有林）の空中写真。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#trinya",
    credit: "林野庁",
  },
  52: {
    id: 52,
    name: "森林（民有林）の空中写真",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/rinya_m/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/rinya_m/14/14533/6452.png",
    detailText: "都道府県が整備した森林（民有林）の空中写真。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#trinya",
    credit: "都道府県",
  },
  53: {
    id: 53,
    name: "土地被覆（GLCNMO）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/gmld_glcnmo2/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/gmld_glcnmo2/5/28/12.png",
    detailText: "地球地図全球版 土地被覆（GLCNMO） 第2版。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#glcnmo2",
    credit: "© 国土地理院・千葉大学・協働機関",
  },
  54: {
    id: 54,
    name: "植生（樹木被覆率）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/gmld_ptc2/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/gmld_ptc2/5/28/12.png",
    detailText: "地球地図全球版 植生（樹木被覆率） 第2版。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#ptc2",
    credit: "© 国土地理院・千葉大学・協働機関",
  },
  55: {
    id: 55,
    name: "標高タイル（DEM1A PNG形式）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/dem1a_png/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/dem1a_png/17/115408/51368.png",
    detailText: "基盤地図情報数値標高モデル（DEM1A）のPNG形式タイル。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#dem",
    credit: "国土地理院",
  },
  56: {
    id: 56,
    name: "標高タイル（DEM5A PNG形式）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/dem5a_png/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/dem5a_png/15/28852/12842.png",
    detailText: "基盤地図情報数値標高モデル（DEM5A）のPNG形式タイル。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#dem",
    credit: "国土地理院",
  },
  57: {
    id: 57,
    name: "標高タイル（DEM5B PNG形式）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/dem5b_png/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/dem5b_png/15/28852/12842.png",
    detailText: "基盤地図情報数値標高モデル（DEM5B）のPNG形式タイル。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#dem",
    credit: "国土地理院",
  },
  58: {
    id: 58,
    name: "標高タイル（DEM5C PNG形式）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/dem5c_png/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/dem5c_png/15/28852/12842.png",
    detailText: "基盤地図情報数値標高モデル（DEM5C）のPNG形式タイル。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#dem",
    credit: "国土地理院",
  },
  59: {
    id: 59,
    name: "標高タイル（DEM10B PNG形式）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/dem_png/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/dem_png/14/14552/6439.png",
    detailText: "基盤地図情報数値標高モデル（DEM10B）のPNG形式タイル。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#dem",
    credit: "国土地理院",
  },
  60: {
    id: 60,
    name: "標高タイル（地球地図全球版 PNG形式）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/demgm_png/{z}/{x}/{y}.png",
    sampleUrl: "https://cyberjapandata.gsi.go.jp/xyz/demgm_png/8/227/100.png",
    detailText: "地球地図全球版標高第2版のPNG形式タイル。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#demgm",
    credit: "国土地理院",
  },
  61: {
    id: 61,
    name: "湖水深タイル",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/lakedepth/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/lakedepth/14/14500/6386.png",
    detailText: "湖沼調査で得られた水深グリッド（DEM）のPNG形式タイル。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#lakedepth",
    credit: "国土地理院",
  },
  62: {
    id: 62,
    name: "基準水面標高タイル",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/lakedepth_standard/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/lakedepth_standard/14/14500/6386.png",
    detailText: "湖沼調査により得られた各湖沼の基準水面の標高値タイル。",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#lakedepth_standard",
    credit: "国土地理院",
  },
  63: {
    id: 63,
    name: "土地分類基本調査（地形分類図）",
    XYZUrl:
      "https://nlftp.mlit.go.jp/kokjo/inspect/tile/landclassification/land_history/terrainclassification/terrainclassification1/{z}/{x}/{y}.png",
    sampleUrl:
      "https://nlftp.mlit.go.jp/kokjo/inspect/tile/landclassification/land_history/terrainclassification/terrainclassification1/13/7222/3250.png",
    detailText: "国土交通省政策統括官付地理空間情報課が整備した地形分類図。",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#tochibunruikihonchosa",
    credit: "国土交通省政策統括官付地理空間情報課",
  },
  64: {
    id: 64,
    name: "土地分類基本調査（土地利用分類（明治期））",
    XYZUrl:
      "https://nlftp.mlit.go.jp/kokjo/inspect/tile/landclassification/land_history/landuseclassification/landuseclassification1/{z}/{x}/{y}.png",
    sampleUrl:
      "https://nlftp.mlit.go.jp/kokjo/inspect/tile/landclassification/land_history/landuseclassification/landuseclassification1/13/7222/3250.png",
    detailText:
      "国土交通省政策統括官付地理空間情報課が整備した土地利用分類（第一期：明治期）。",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#tochibunruikihonchosa",
    credit: "国土交通省政策統括官付地理空間情報課",
  },
  65: {
    id: 65,
    name: "土地分類基本調査（土地利用分類（昭和期））",
    XYZUrl:
      "https://nlftp.mlit.go.jp/kokjo/inspect/tile/landclassification/land_history/landuseclassification/landuseclassification2/{z}/{x}/{y}.png",
    sampleUrl:
      "https://nlftp.mlit.go.jp/kokjo/inspect/tile/landclassification/land_history/landuseclassification/landuseclassification2/13/7222/3250.png",
    detailText:
      "国土交通省政策統括官付地理空間情報課が整備した土地利用分類（第二期：昭和期）。",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#tochibunruikihonchosa",
    credit: "国土交通省政策統括官付地理空間情報課",
  },
  66: {
    id: 66,
    name: "シームレス地質図（産総研）",
    XYZUrl: "https://gbank.gsj.jp/seamless/v2/api/1.3.1/tiles/{z}/{y}/{x}.png",
    sampleUrl:
      "https://gbank.gsj.jp/seamless/v2/api/1.3.1/tiles/11/802/1821.png",
    detailText:
      "産業技術総合研究所地質調査総合センターが提供するシームレス地質図。{y}/{x}の順序に注意。",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#gsjGeomap_seamless200k_v2",
    credit: "産業技術総合研究所地質調査総合センター",
  },
  67: {
    id: 67,
    name: "5万分の1地質図幅（産総研, 例: 東京西北部）",
    XYZUrl: "https://tiles.gsj.jp/tiles/geomap/13054/{z}/{x}/{y}.png",
    sampleUrl: "https://tiles.gsj.jp/tiles/geomap/13054/14/14552/6439.png",
    detailText:
      "産業技術総合研究所地質調査総合センターが提供する5万分の1地質図幅。{図幅識別名}が必要。",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#gsjGeomap_seamless200k_v2",
    credit: "産業技術総合研究所地質調査総合センター",
  },
  68: {
    id: 68,
    name: "地すべり地形分布図（防災科研）",
    XYZUrl: "https://www.j-shis.bosai.go.jp/map/xyz/landslide/{z}/{x}/{y}.png",
    sampleUrl:
      "https://www.j-shis.bosai.go.jp/map/xyz/landslide/13/7262/3214.png",
    detailText:
      "防災科学技術研究所地震ハザードステーション（J-SHIS）が提供する地すべり地形分布図。",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#landslide",
    credit: "防災科学技術研究所",
  },
  69: {
    id: 69,
    name: "令和6年宮崎県日向灘地震（日南地区）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20240809hyuganada_nichinan_0809do_sokuho/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20240809hyuganada_nichinan_0809do_sokuho/15/28349/13342.png",
    detailText:
      "令和6年宮崎県日向灘を震源とする地震 日南地区 正射画像（速報）（2024年8月9日撮影）",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#t20240809hyuganada_nichinan_0809do_sokuho",
    credit: "国土地理院",
  },
  70: {
    id: 70,
    name: "令和6年豊後水道の地震（宿毛地区）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20240419bungosuido_sukumo_0418do/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20240419bungosuido_sukumo_0418do/15/28462/13206.png",
    detailText: "令和6年豊後水道の地震 宿毛地区 正射画像（2024年4月18日撮影）",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#t20240419bungosuido_sukumo_0418do",
    credit: "国土地理院",
  },
  71: {
    id: 71,
    name: "令和6年能登半島地震（能登地区 4月撮影）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_0405_0426do/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_0405_0426do/11/1802/796.png",
    detailText:
      "令和6年能登半島地震 能登地区 正射画像（2024年4月5日～4月26日撮影）",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#t20240102noto_0405_0426do",
    credit: "国土地理院",
  },
  72: {
    id: 72,
    name: "令和6年能登半島地震（輪島中地区 1/2撮影）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_wazimanaka_0102do/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20240102noto_wazimanaka_0102do/15/28844/12709.png",
    detailText: "令和6年能登半島地震 輪島中地区 正射画像（2024年1月2日撮影）",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#t20240102noto_wazimanaka_0102do",
    credit: "国土地理院",
  },
  73: {
    id: 73,
    name: "令和6年7月大雨（浸水推定図 最上川）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20240726rain_mogamigawa_0726dansaizu/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20240726rain_mogamigawa_0726dansaizu/14/14572/6277.png",
    detailText:
      "令和6年7月25日からの大雨 浸水推定図 最上川水系 最上川（2024年7月26日14時作成）",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#t20240726rain_mogamigawa_0726dansaizu",
    credit: "国土地理院",
  },
  74: {
    id: 74,
    name: "令和5年6月大雨（浸水推定図 筑後川）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20230629rain_0711shinsui/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20230629rain_0711shinsui/14/14137/6580.png",
    detailText:
      "令和5年6月29日からの大雨 浸水推定図 筑後川水系筑後川（2023年7月11日1時作成）",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#t20230629rain_0711shinsui",
    credit: "国土地理院",
  },
  75: {
    id: 75,
    name: "令和3年7月大雨（正射画像 熱海伊豆山）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20210705oame_0706do/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20210705oame_0706do/15/29043/12966.png",
    detailText: "令和3年7月1日からの大雨 正射画像 熱海伊豆山地区（7/6撮影）",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#t20210705oame_0706do",
    credit: "国土地理院",
  },
  76: {
    id: 76,
    name: "令和2年7月豪雨（浸水推定図 球磨川）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20200703oame_kumagawa_0704dansaizu/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20200703oame_kumagawa_0704dansaizu/14/14138/6629.png",
    detailText:
      "令和2年7月豪雨 浸水推定図 球磨川水系球磨川（2020年7月4日20時作成）",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#t20200703oame_kumagawa_0704dansaizu",
    credit: "国土地理院",
  },
  77: {
    id: 77,
    name: "令和元年台風第19号（浸水推定図 信濃川）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20191012typhoon19_shinano_1013dansaizu/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20191012typhoon19_shinano_1013dansaizu/14/14484/6394.png",
    detailText: "令和元年台風第19号 浸水推定段彩図 信濃川水系（千曲川）",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#t20191012typhoon19_shinano_1013dansaizu",
    credit: "国土地理院",
  },
  78: {
    id: 78,
    name: "平成30年北海道胆振東部地震（デジタル標高地形図）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20180906hokkaido_atsuma_digital/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20180906hokkaido_atsuma_digital/15/29300/12072.png",
    detailText: "平成30年北海道胆振東部地震 デジタル標高地形図 厚真町周辺",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#t20180906hokkaido_atsuma_digital",
    credit: "国土地理院",
  },
  79: {
    id: 79,
    name: "平成28年熊本地震（応急復旧対策基図）",
    XYZUrl: "https://cyberjapandata.gsi.go.jp/xyz/fukkyukizu/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/fukkyukizu/18/226452/105699.png",
    detailText: "平成28年熊本地震 応急復旧対策基図",
    detailUrl: "https://maps.gsi.go.jp/development/ichiran.html#fukkyukizu",
    credit: "国土地理院",
  },
  80: {
    id: 80,
    name: "平成23年東北地方太平洋沖地震（津波浸水範囲）",
    XYZUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20110311_tohoku_shinsui/{z}/{x}/{y}.png",
    sampleUrl:
      "https://cyberjapandata.gsi.go.jp/xyz/20110311_tohoku_shinsui/11/1825/789.png",
    detailText: "平成23年東北地方太平洋沖地震 津波浸水範囲",
    detailUrl:
      "https://maps.gsi.go.jp/development/ichiran.html#t20110311_tohoku_shinsui",
    credit: "国土地理院",
  },
};
