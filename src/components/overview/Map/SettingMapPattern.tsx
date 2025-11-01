import { IconLink } from "@tabler/icons-react";

type Props = {
  img: string;
  title: string;
  text: string;
  className?: string;
  link?: string;
  now?: boolean;
};

export default function SettingMapPattern(props: Props) {
  return (
    <div
      className={`flex items-center justify-baseline ${props.className} w-full cursor-pointer`}
    >
      <img
        className={`h-15 aspect-square rounded-md mr-4 border-gray-100 border-2 hover:border-gray-200 transition-all duration-100 ${
          props.now && "border-gray-200"
        }`}
        src={props.img}
        alt={props.title + "サンプル画像"}
      />
      <div className="w-[80%]">
        <div className="flex items-center justify-baseline">
          <p className="text-gray-300 text-2xl line-clamp-1">{props.title}</p>
          {props.link && <IconLink className="text-gray-200 ml-1" size={18} />}
        </div>
        <p className="text-gray-200 text-1xl line-clamp-2 font-medium">
          {props.text}
        </p>
      </div>
    </div>
  );
}
