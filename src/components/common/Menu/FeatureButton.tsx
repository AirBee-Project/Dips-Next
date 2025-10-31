import type { Icon, IconProps } from "@tabler/icons-react";
import { Link } from "react-router";

type Props = {
  link: string;
  text: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
};

export default function FeatureButton(props: Props) {
  return (
    <Link to={props.link} viewTransition>
      <div className="flex bg-white-100 text-gray-400 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-all duration-100 ease-in-out cursor-pointer w-52 @max-[10rem]:w-10">
        <props.icon />
        <p className="font-extrabold @max-[10rem]:hidden ml-2">{props.text}</p>
      </div>
    </Link>
  );
}
