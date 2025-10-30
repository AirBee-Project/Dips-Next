type Props = {
  placeholder: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBox(props: Props) {
  return (
    <div className="px-2 py-1.5 border-gray-100 border-3 rounded-md w-52">
      <input type="text" placeholder={props.placeholder} />
    </div>
  );
}
