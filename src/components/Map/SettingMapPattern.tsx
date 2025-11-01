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

  return (
    <div
      className={`flex items-center justify-baseline ${props.className} w-full `}
    >
      <img
        className={`h-15 aspect-square rounded-md mr-4 border-gray-100 border-2 hover:border-accent-300 transition-all cursor-pointer duration-100 ${
          props.id === tileId && "border-gray-200 hover:border-gray-200"
        }`}
        src={props.img}
        alt={props.title + "サンプル画像"}
        key={props.id}
        onClick={() => {
          setTileId(props.id);
        }}
      />
      <div className="w-[80%]">
        <div className="flex items-center justify-baseline">
          <p className="text-gray-300 text-2xl line-clamp-1">{props.title}</p>
          {props.link && (
            <Link to={props.link}>
              <IconLink
                className="text-gray-200 hover:text-accent-300 ml-1"
                size={18}
              />
            </Link>
          )}
        </div>
        <p className="text-gray-200 text-1xl line-clamp-2 font-medium">
          {props.text}
        </p>
      </div>
    </div>
  );
}
