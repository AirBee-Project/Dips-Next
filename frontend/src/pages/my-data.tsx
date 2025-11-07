import Key from "../components/my-data/Key";
import Value from "../components/my-data/Value";

export default function MyData() {
  return (
    <div className="flex overflow-x-hidden">
      <div className="flex z-10">
        <Key />
        <Value />
      </div>
    </div>
  );
}
