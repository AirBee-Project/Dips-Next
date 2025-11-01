import { useMap } from "../../context/Map";

export default function Time() {
  const { clockTheme, setClockTheme } = useMap();
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
        2025/10/31
        <br />
        13:52:02 UTC
      </p>
    </div>
  );
}
