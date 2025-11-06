import { IconPlus } from "@tabler/icons-react";

type PullDown = {};

type Props = {
  className?: string;
};

export default function PlusPullDown(props: Props) {
  return (
    <div
      className={`$h-max p-1.5 {props.className} border-3 border-gray-100 rounded-md`}
    >
      <IconPlus
        className="text-gray-100 transition-all duration-300 hover:rotate-90"
        stroke={2.5}
      />
    </div>
  );
}
