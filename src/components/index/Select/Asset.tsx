import { useDraggable } from "@dnd-kit/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

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
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.title,
  });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: transform ? 9999 : "auto",
    position: transform ? "relative" : "static",
  };

  const [isOpenAsset, setIsOpenAsset] = useState(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group border-gray-100 border-3 rounded-md px-4.5 pt-2.5 transition-all ${props.className} hover:border-gray-200`}
    >
      <div className="flex items-center justify-between">
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab active:cursor-grabbing"
        >
          <p className="text-2xl text-gray-400 truncate">{props.title}</p>
          <p className="text-1xl text-gray-200 mb-2">
            値の種類：{assetsTypeInfo[props.assetsType].text}
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenAsset(!isOpenAsset);
          }}
          className="cursor-pointer"
        >
          {(props.detail || props.info) && (
            <IconChevronDown
              className={`text-gray-200 hover:text-gray-400 transition-transform ${
                isOpenAsset ? "rotate-180" : ""
              }`}
            />
          )}
        </button>
      </div>

      {isOpenAsset && (
        <div>
          {props.detail && (
            <p className="text-1xl text-gray-200 pb-3">{props.detail}</p>
          )}
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
