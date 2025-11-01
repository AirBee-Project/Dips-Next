import { IconSearch } from "@tabler/icons-react";

type Props = {
  placeholder: string;
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

export default function SearchBox(props: Props) {
  return (
    <div
      className={`py-1.5 border-gray-100 border-3 rounded-md flex ${props.className}`}
    >
      <IconSearch className="text-gray-100 aspect-square mx-1.5" stroke={3} />
      <input
        type="text"
        placeholder={props.placeholder}
        className="w-[75%] text-gray-300 border-0 focus:outline-0"
      />
    </div>
  );
}
