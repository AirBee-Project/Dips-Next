import type { Icon, IconProps } from "@tabler/icons-react";

type Props = {
  text: String;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
};

export default function FeatureButton(props: Props) {
  return (
    <div className="">
      <div className="flex bg-white-100 text-gray-400 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-all duration-200 ease-in-out cursor-pointer w-52">
        <props.icon className="mr-2" />
        <p className="font-extrabold">{props.text}</p>
      </div>
    </div>
  );
}
