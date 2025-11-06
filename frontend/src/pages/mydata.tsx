import SelectKey from "../components/my-data/SelectKey";
import Select from "../components/overview/Select/Select";

export default function MyData() {
  return (
    <div className="flex overflow-x-hidden">
      <div className="flex z-10">
        <SelectKey />
      </div>
    </div>
  );
}
