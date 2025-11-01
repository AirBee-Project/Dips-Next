import { formatInTimeZone } from "date-fns-tz";
import { useMap } from "../../context/Map";
import { useEffect } from "react";

export default function Time() {
  const {
    clockTheme,
    setClockTheme,
    currentTime,

    timeZone,
  } = useMap();
  return (
    <div
      onClick={() => setClockTheme(clockTheme === "light" ? "dark" : "light")}
      className="text-white text-sm rounded px-2 py-1 cursor-pointer"
    >
      <p
        className={`code ${clockTheme === "dark" && "text-gray-200"} ${
          clockTheme === "light" && "bg-gray-300 text-white"
        }`}
      >
        {formatInTimeZone(currentTime, timeZone, "yyyy-MM-dd")}
        <br />
        {formatInTimeZone(currentTime, timeZone, "HH:mm:ss zzz")}
      </p>
    </div>
  );
}
