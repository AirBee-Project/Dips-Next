import { useState } from "react";
import { ResizableBox } from "react-resizable";
import { useMenu } from "../../context/Menu"; 
import { 
  IconCube, IconMapPin
} from "@tabler/icons-react";
import SearchBox from "../common/SearchBox";
import { useMapObject } from "../../context/MapObjectContext";
import { plateauDataList } from "../../data/Plateau3DTails";

export default function MapObjectList() {
  const { addLayer } = useMapObject();
  const { isMenuOpen } = useMenu(); 
  const [assetSearch, setAssetSearch] = useState("");
  const [width, setWidth] = useState(290);

  const filteredAssets = plateauDataList.filter(asset => {
    const searchLower = assetSearch.toLowerCase();
    return (
      asset.name.toLowerCase().includes(searchLower) ||
      asset.pref_name.includes(assetSearch) ||
      (asset.city_name && asset.city_name.includes(assetSearch))
    );
  });

  return (
    <div className="flex z-50">
      <ResizableBox
        width={width}
        axis="x"
        onResize={(e, data) => setWidth(data.size.width)}
        minConstraints={[240, 200]}
        maxConstraints={[500, 200]}
        handle={
          <span
            className="absolute top-0 right-0 h-full w-2 cursor-ew-resize"
            onClick={(e) => e.stopPropagation()}
          />
        }
        handleSize={[10, 10]}

        className={`${
          isMenuOpen ? "w-70 border-r-4" : "hidden"
        } h-screen bg-white-100 flex flex-col items-center border-gray-100`}
      >
        {/* ヘッダー */}
        <div className="w-full p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-700 ">Map Object</h2>
        </div>
        
        {/* 検索 */}
        <div className="mt-3 w-[80%]">
          <SearchBox 
            placeholder="データを検索" 
            search={assetSearch} 
            setSearch={setAssetSearch} 
            className="w-full"
          />
        </div>

        {/* リスト */}
        <div className="w-full flex-1 overflow-y-auto p-2 space-y-2 hidden-scrollbar flex flex-col items-center">
          {filteredAssets.map((item, index) => (
            <div 
              key={`${item.url}-${index}`}
              onClick={() => addLayer(item)}
              className="w-[85%] group flex items-center p-2 rounded-md border-2 border-gray-100 hover:border-accent-200 hover:bg-white cursor-pointer transition-all bg-white-100"
            >
              <div className="p-1.5 rounded-md mr-3 group-hover:bg-white transition-colors">
                {item.format === "3DTiles" 
                  ? <IconCube size={20} className="text-gray-500 group-hover:text-accent-300" />
                  : <IconMapPin size={20} className="text-gray-500 group-hover:text-accent-300" />
                }
              </div>
              <div className="min-w-0 overflow-hidden text-left">
                <p className="text-sm font-bold text-gray-400 group-hover:text-accent-300 truncate">
                  {item.name}
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                    {item.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ResizableBox>
    </div>
  );
}