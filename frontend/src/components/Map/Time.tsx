import { formatInTimeZone } from "date-fns-tz";
import { useMap } from "../../context/Map";
import {
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from "@tabler/icons-react";
import {
  playCesiumTime,
  pauseCesiumTime,
} from "../../utils/cesium/cesiumClockController";

export default function Time() {
  const {
    clockTheme,
    setClockTheme,
    currentTime,
    timeZone,
    isPaused,
    setIsPaused,
    viewerRef,
  } = useMap();

  return (
    <div
      className={` text-sm rounded px-2 py-1 cursor-pointer flex items-center ${clockTheme === "dark" && "text-gray-200"
        } ${clockTheme === "light" && "bg-gray-300 text-white"
        } rounded-none p-0 m-0`}
    >
      <p
        className={`code`}
        onClick={() => setClockTheme(clockTheme === "light" ? "dark" : "light")}
      >
        {formatInTimeZone(currentTime, timeZone, "yyyy-MM-dd")}
        <br />
        {formatInTimeZone(currentTime, timeZone, "HH:mm:ss zzz")}
      </p>
      <div
        className="pl-2 pr-1"
        onClick={() => {
          if (isPaused) {
            playCesiumTime(viewerRef);
            setIsPaused(false);
          } else {
            pauseCesiumTime(viewerRef);
            setIsPaused(true);
          }
        }}
      >
        {isPaused ? (
          <IconPlayerPlayFilled size={25} />
        ) : (
          <IconPlayerStopFilled size={25} />
        )}
      </div>
    </div>
  );
}
