import React, { createContext, useContext, useState, useCallback } from "react";

// === 型定義 ===
export type SceneMode = "3D" | "2D" | "Columbus";

interface MapContextType {
  sceneMode: SceneMode;
  setSceneMode: (mode: SceneMode) => void;

  tileUrl: string;
  setTileUrl: (url: string) => void;

  currentTime: Date;
  setCurrentTime: (time: Date) => void;

  timeSpeed: number; // 倍速（例：1.0, 2.0, -1.0など）
  setTimeSpeed: (speed: number) => void;

  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;

  timeDirection: "forward" | "backward";
  setTimeDirection: (dir: "forward" | "backward") => void;

  clockTheme: "light" | "dark";
  setClockTheme: (theme: "light" | "dark") => void;
}

// === デフォルト値 ===
const defaultValues: MapContextType = {
  sceneMode: "3D",
  setSceneMode: () => {},

  tileUrl: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
  setTileUrl: () => {},

  currentTime: new Date(),
  setCurrentTime: () => {},

  timeSpeed: 1,
  setTimeSpeed: () => {},

  isPaused: false,
  setIsPaused: () => {},

  timeDirection: "forward",
  setTimeDirection: () => {},

  clockTheme: "light",
  setClockTheme: () => {},
};

// === Context作成 ===
const MapContext = createContext<MapContextType>(defaultValues);

// === Provider ===
export const CesiumProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sceneMode, setSceneMode] = useState<SceneMode>("3D");
  const [tileUrl, setTileUrl] = useState(
    "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
  );
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [timeDirection, setTimeDirection] = useState<"forward" | "backward">(
    "forward"
  );
  const [clockTheme, setClockTheme] = useState<"light" | "dark">("light");

  // 時間の更新関数（例：外部から操作したいとき）
  const tickTime = useCallback(() => {
    if (isPaused) return;
    setCurrentTime((prev) => {
      const delta = timeSpeed * (timeDirection === "forward" ? 1 : -1);
      return new Date(prev.getTime() + delta * 1000);
    });
  }, [isPaused, timeSpeed, timeDirection]);

  return (
    <MapContext.Provider
      value={{
        sceneMode,
        setSceneMode,
        tileUrl,
        setTileUrl,
        currentTime,
        setCurrentTime,
        timeSpeed,
        setTimeSpeed,
        isPaused,
        setIsPaused,
        timeDirection,
        setTimeDirection,
        clockTheme,
        setClockTheme,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

// === 利用用のHook ===
export const useMap = () => useContext(MapContext);
