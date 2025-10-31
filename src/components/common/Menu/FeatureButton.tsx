import type { Icon, IconProps } from "@tabler/icons-react";
import { Link, useLocation } from "react-router";

type Props = {
  link: string;
  text: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
};

export default function FeatureButton(props: Props) {
  const location = useLocation();
  const isActive = location.pathname === props.link;

  return (
    <Link to={props.link}>
      <div
        className={`flex text-gray-400 px-2 py-1.5 rounded-md 
          transition-all duration-100 ease-in-out cursor-pointer w-52 @max-[10rem]:w-10
          ${
            isActive ? "bg-gray-100" : "hover:bg-gray-100 hover:text-gray-400"
          }`}
      >
        <props.icon />
        <p className="font-extrabold @max-[10rem]:hidden ml-2">{props.text}</p>
      </div>
    </Link>
  );
}
