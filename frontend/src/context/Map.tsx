import type { Viewer as CesiumViewer } from "cesium";
import React, { createContext, useContext, useState, useRef } from "react";

// === 型定義 ===
export type SceneMode = "3D" | "2D" | "Columbus";
export type WindowMode = "Hide" | "Map" | "Time";
export type RoutePoint = {
  lat: number;
  lon: number;
  height: number;
} | null;

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

  clockTheme: "light" | "dark";
  setClockTheme: (theme: "light" | "dark") => void;

  timeZone: string;
  setTimeZone: (timezone: string) => void;

  routeStart: RoutePoint;
  setRouteStart: (point: RoutePoint) => void;
  routeEnd: RoutePoint;
  setRouteEnd: (point: RoutePoint) => void;

  /** Cesium Viewer インスタンス共有用 */
  viewerRef: React.MutableRefObject<CesiumViewer | null>;

  mapVisible: boolean;
  setMapVisible: React.Dispatch<React.SetStateAction<boolean>>;

}

// === デフォルト値 ===
const defaultValues: MapContextType = {
  windowMode: "Map",
  setWindowMode: () => { },

  sceneMode: "3D",
  setSceneMode: () => { },

  tileId: 1,
  setTileId: () => { },

  currentTime: new Date(),
  setCurrentTime: () => { },

  timeSpeed: 2,
  setTimeSpeed: () => { },

  isPaused: false,
  setIsPaused: () => { },

  clockTheme: "light",
  setClockTheme: () => { },

  timeZone: "Asia/Tokyo",
  setTimeZone: () => { },

  viewerRef: { current: null },

  mapVisible: true,
  setMapVisible: () => { },

  routeStart: null,
  setRouteStart: () => { },
  routeEnd: null,
  setRouteEnd: () => { },

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
  const [clockTheme, setClockTheme] = useState<"light" | "dark">("light");
  const [timeZone, setTimeZone] = useState("Asia/Tokyo");
  const viewerRef = useRef<CesiumViewer | null>(null);
  const [mapVisible, setMapVisible] = useState(true);
  const [routeStart, setRouteStart] = useState<RoutePoint>(null);
  const [routeEnd, setRouteEnd] = useState<RoutePoint>(null);

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
        clockTheme,
        setClockTheme,
        timeZone,
        setTimeZone,
        viewerRef,
        mapVisible,
        setMapVisible,
        routeStart,
        setRouteStart,
        routeEnd,
        setRouteEnd,

      }}
    >
      {children}
    </MapContext.Provider>
  );
};

// === 利用用のHook ===
export const useMap = () => useContext(MapContext);
