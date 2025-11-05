import { useEffect } from "react";
import Select from "../components/overview/Select/Select";
import { useMap } from "../context/Map";

export default function MyData() {
  const { setMapVisible } = useMap();

  //最初にMapを非表示にする
  useEffect(() => {
    setMapVisible(true);
  }, []);

  return (
    <div className="flex overflow-x-hidden">
      <div className="flex z-10">
        <h1>MyData</h1>
      </div>
    </div>
  );
}
