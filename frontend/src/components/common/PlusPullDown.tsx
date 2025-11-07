import { IconPlus, type Icon, type IconProps } from "@tabler/icons-react";
import { useState, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

type PullDown = {
  text: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
};

type Props = {
  className?: string;
  handleClick: (key: string) => void;
  pullDowns: Record<string, PullDown>;
};

export default function PlusPullDown(props: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 外側クリックで閉じる
  useClickOutside(containerRef, () => setOpen(false));

  return (
    <div
      ref={containerRef}
      className={`relative border-[3px] border-gray-100 rounded-md ${props.className} h-full`}
    >
      {/* プラスボタン */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="transition-all duration-300 hover:rotate-90 text-gray-200 h-full aspect-square flex items-center justify-center"
      >
        <IconPlus stroke={2.5} />
      </button>

      {/* プルダウンメニュー */}
      <div
        className={`absolute bg-white border-[3px] border-gray-100 rounded-md shadow-md py-2 w-max -right-1 -top-1 transition-all duration-200 origin-top-right ${
          open
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {Object.entries(props.pullDowns).map(([key, item], index) => (
          <div
            key={key}
            onClick={() => {
              props.handleClick(key);
              setOpen(false); // メニューを閉じる
            }}
            className="flex items-center py-1 px-3 cursor-pointer hover:bg-gray-100 transition"
          >
            <item.icon className="text-gray-400" size={22} />
            <p className="text-gray-200 ml-2 font-medium">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
