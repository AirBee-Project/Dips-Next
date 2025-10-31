type AssetsType = "String" | "Number" | "Boolean";

export const assetsTypeInfo: Record<AssetsType, { text: string }> = {
  String: { text: "文字列" },
  Number: { text: "数値" },
  Boolean: { text: "真偽値" },
};

type Props = {
  title: string;
  assetsType: AssetsType;
  detail?: string;
  className?: string;
  info?: { title: string; text: string }[];
};

export default function Asset(props: Props) {
  return (
    <div
      className={`group border-gray-100 border-3 rounded-md px-4.5 pt-2.5 transition-all duration-300 ${props.className} hover:border-gray-200`}
    >
      {/* タイトル */}
      <p className="text-2xl text-gray-400 truncate">{props.title}</p>

      {/* 種類 */}
      <p className="text-1xl text-gray-200 mb-2">
        値の種類：{assetsTypeInfo[props.assetsType].text}
      </p>

      {/* 詳細（アコーディオン風に展開） */}
      {props.detail && (
        <div
          className="
            max-h-0 
            opacity-0 
            overflow-hidden 
            transition-all duration-450 ease-in-out
            group-hover:max-h-100
            group-hover:opacity-100 
            mt-0 
            group-hover:mt-2
          "
        >
          <p className="text-1xl text-gray-200 pb-3">{props.detail}</p>
          {/* Info テーブル */}
          {props.info && (
            <div className="text-1xl text-gray-200 py-2 border-t-2 border-gray-100">
              <table>
                <tbody>
                  {props.info.map((item, index) => (
                    <tr key={index} className="text-left">
                      <td>{item.title}</td>
                      <th>：</th>
                      <th>{item.text}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
