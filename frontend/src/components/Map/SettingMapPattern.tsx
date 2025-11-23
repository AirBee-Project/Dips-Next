import { IconLink } from "@tabler/icons-react";
import { Link } from "react-router";
import { useMap } from "../../context/Map";

type Props = {
  id: number;

  img: string;
  title: string;
  text: string;
  className?: string;
  link?: string;
};

export default function SettingMapPattern(props: Props) {
  const { tileId, setTileId } = useMap();
  const isSelected = props.id === tileId;

  return (
    <div
      className={`flex items-center justify-baseline ${props.className} w-full overflow-x-clip `}
    >
      <img
        className={`h-15 w-15 aspect-square rounded-md mr-4 transition-all cursor-pointer duration-100 
          ${isSelected ? "border-accent-300 border-3" : "border-gray-100 border-2 hover:border-accent-300"
          }`}
        src={props.img}
        alt={props.title + "サンプル画像"}
        key={props.id}
        onClick={() => {
          setTileId(props.id);
        }}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.onerror = null; // 無限ループ防止
          target.src = "/components/Map/NoTile.svg"; // 代替画像のパス
        }}
      />
      <div className="w-[80%]">
        <div className="flex items-center justify-baseline">
          <p className="text-[19px] line-clamp-1 font-bold text-gray-300">
            {props.title}
          </p>
          {props.link && (
            <Link to={props.link} target="_blank" rel="noopener noreferrer">
              <IconLink
                className="text-gray-200 hover:text-accent-300 ml-1"
                size={18}
              />
            </Link>
          )}
        </div>
        <p className="text-gray-200 text-1xl line-clamp-2 font-medium h-10">
          {props.text}
        </p>
      </div>
    </div>
  );
}
