import { IconSearch } from "@tabler/icons-react";

type Props = {
  placeholder: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSearch?: (value: string) => void; // 🔹 検索実行時の関数を受け取る
  className?: string;
};

export default function SearchBox({
  placeholder,
  search,
  setSearch,
  onSearch,
  className,
}: Props) {
  // 🔹 Enterキーで検索発火
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(search);
    }
  };

  return (
    <div
      className={`py-1.5 border-gray-100 border-3 rounded-md flex items-center ${className}`}
    >
      <IconSearch
        className="text-gray-100 aspect-square mx-1.5 cursor-pointer hover:text-gray-200 transition-all duration-75"
        stroke={3}
        onClick={() => onSearch && onSearch(search)} // 🔹 アイコンクリックでも発火
      />
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full text-gray-700 border-0 focus:outline-none"
      />
    </div>
  );
}
