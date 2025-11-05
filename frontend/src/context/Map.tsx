import React, { createContext, useContext, useState } from "react";

// === 型定義 ===
export type SceneMode = "3D" | "2D" | "Columbus";
export type WindowMode = "Hide" | "Map" | "Time";
export interface CameraView {
  longitude: number; // 経度（degrees）
  latitude: number; // 緯度（degrees）
  height: number; // 高度（m）
  heading: number; // 方位角（radians）
  pitch: number; // 傾き（radians）
  roll: number; // ロール（radians）
}

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

  cameraView: CameraView;
  setCameraView: React.Dispatch<React.SetStateAction<CameraView>>;
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

  cameraView: {
    longitude: 139.767, // 東京駅付近
    latitude: 35.681,
    height: 1500,
    heading: 0,
    pitch: -0.5,
    roll: 0,
  },
  setCameraView: () => {},
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

  const [cameraView, setCameraView] = useState<CameraView>({
    longitude: 139.767,
    latitude: 35.681,
    height: 1500,
    heading: 0,
    pitch: -0.5,
    roll: 0,
  });

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
        cameraView,
        setCameraView,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

// === 利用用のHook ===
export const useMap = () => useContext(MapContext);
