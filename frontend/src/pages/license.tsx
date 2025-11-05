import UsedLicense from "../components/license/UsedLicense";
import { LicenseList } from "../data/License";
import { ZXYTileMapList } from "../data/ZXYTailMapList";

export default function License() {
  return (
    <div className="w-full h-screen flex flex-col items-center overflow-y-scroll">
      <div className="w-[40%] pt-30">
        <p className="text-5xl text-gray-400">License</p>
        <div className="mt-20">
          {LicenseList.map((item, index) => (
            <UsedLicense
              key={index}
              name={item.name}
              url={item.url}
              license={item.license}
              note={item.note}
            />
          ))}

          {Object.entries(ZXYTileMapList).map(([key, item], index) => (
            <UsedLicense
              key={key + index}
              name={item.name}
              url={item.detailUrl}
              license={item.credit}
              note={item.detailText}
            />
          ))}
        </div>
      </div>
      <p className="py-20 text-3xl text-gray-400">
        Gratitude to all open source contributors!
      </p>
    </div>
  );
}
