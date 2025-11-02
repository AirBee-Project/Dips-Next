import { tr } from "motion/react-client";
import React, { createContext, useContext, useState, useCallback } from "react";

// === 型定義 ===
export type SceneMode = "3D" | "2D" | "Columbus";
export type WindowMode = "Hide" | "Map" | "Time";

interface MapContextType {
  windowMode: WindowMode;
  setWindowMode: (mode: WindowMode) => void;

  sceneMode: SceneMode;
  setSceneMode: (mode: SceneMode) => void;

  tileId: number;
  setTileId: (id: number) => void;

  currentTime: Date;
  setCurrentTime: React.Dispatch<React.SetStateAction<Date>>;

  timeSpeed: number;
  setTimeSpeed: (speed: number) => void;

  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;

  timeDirection: "forward" | "backward";
  setTimeDirection: (dir: "forward" | "backward") => void;

  clockTheme: "light" | "dark";
  setClockTheme: (theme: "light" | "dark") => void;

  timeZone: string;
  setTimeZone: (timezone: string) => void;
}

// === デフォルト値 ===
const defaultValues: MapContextType = {
  windowMode: "Map",
  setWindowMode: () => {},

  sceneMode: "3D",
  setSceneMode: () => {},

  tileId: 1,
  setTileId: () => {},

  currentTime: new Date(),
  setCurrentTime: () => {},

  timeSpeed: 2,
  setTimeSpeed: () => {},

  isPaused: false,
  setIsPaused: () => {},

  timeDirection: "forward",
  setTimeDirection: () => {},

  clockTheme: "light",
  setClockTheme: () => {},

  timeZone: "Asia/Tokyo",
  setTimeZone: () => {},
};

// === Context作成 ===
const MapContext = createContext<MapContextType>(defaultValues);

// === Provider ===
export const CesiumProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [windowMode, setWindowMode] = useState<WindowMode>("Hide");
  const [sceneMode, setSceneMode] = useState<SceneMode>("3D");
  const [tileId, setTileId] = useState(1);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [timeDirection, setTimeDirection] = useState<"forward" | "backward">(
    "forward"
  );
  const [clockTheme, setClockTheme] = useState<"light" | "dark">("light");
  const [timeZone, setTimeZone] = useState("Asia/Tokyo");

  return (
    <MapContext.Provider
      value={{
        windowMode,
        setWindowMode,
        sceneMode,
        setSceneMode,
        tileId,
        setTileId,
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
        timeZone,
        setTimeZone,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

// === 利用用のHook ===
export const useMap = () => useContext(MapContext);
