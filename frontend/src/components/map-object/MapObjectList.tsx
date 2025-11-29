import { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import { useMenu } from "../../context/Menu"; 
import { 
  IconCube, IconMapPin, IconChevronLeft, IconChevronRight
} from "@tabler/icons-react";
import SearchBox from "../common/SearchBox";
import { useMapObject } from "../../context/MapObjectContext";
import { plateauDataList } from "../../data/Plateau3DTails";

export default function MapObjectList() {
  const { addLayer } = useMapObject();
  const { isMenuOpen } = useMenu(); 
  const [assetSearch, setAssetSearch] = useState("");
  const [width, setWidth] = useState(290);
  const [currentPage, setCurrentPage]=useState(1);

  const filteredAssets = plateauDataList.filter(asset => {
    const searchLower = assetSearch.toLowerCase();
    return (
      asset.name.toLowerCase().includes(searchLower) ||
      asset.pref_name.includes(assetSearch) ||
      (asset.city_name && asset.city_name.includes(assetSearch))
    );
  });
  
  useEffect(() => {
    setCurrentPage(1);
  }, [assetSearch]);

  const totalPages = Math.ceil(filteredAssets.length / 100);
  const currentAssets = filteredAssets.slice(
    (currentPage - 1)* 100,
    currentPage * 100
  );

  const handlePrev = ()=> setCurrentPage(p => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

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
          {currentAssets.map((item, index) => (
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
                  <span className="text-[10px] text-gray-300">
                    {item.pref_name}{item.city_name}
                    </span> 
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*フッター*/}
        {filteredAssets.length > 0 && (
          <div className="w-full p-3 border-t border-gray-100 bg-white flex items-center justify-between">
            <button
             onClick={handlePrev}
             disabled={currentPage ===1}
             className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 disabled: cursor-not-allowed text-gray-500 transition-colors">
              <IconChevronLeft size={20} />
            </button>

            <span className="text-xs font-bold text-gray-400">
              {currentPage} / {totalPages} ページ
              <span className="ml-2 font-normal text-gray-300">({filteredAssets.length}件)</span>
            </span>

            <button
             onClick={handleNext}
             disabled={currentPage === totalPages}
             className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-500 transition-colors"
             >
              <IconChevronRight size={20}/>
             </button>
            
          </div>
        )}
      </ResizableBox>
    </div>
  );
}