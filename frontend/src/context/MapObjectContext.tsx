import { createContext, useContext, useState, type ReactNode } from "react";
import { type Plateau3DTile } from "../data/Plateau3DTails";


export type MapObjectLayer = {
    instanceId: string; 
    data: Plateau3DTile; 
    visible: boolean;    
    color: string;       
    opacity: number;     
};

type MapObjectContextType = {
    layers: MapObjectLayer[];
    addLayer: (data: Plateau3DTile) => void;
    removeLayer: (instanceId: string) => void;
    updateLayer: (instanceId: string, updates: Partial<MapObjectLayer>) => void;
};

const MapObjectContext = createContext<MapObjectContextType>({
    layers: [],
    addLayer: () => { },
    removeLayer: () => { },
    updateLayer: () => { },
});

export const useMapObject = () => useContext(MapObjectContext);

export const MapObjectProvider = ({ children }: { children: ReactNode }) => {
    const [layers, setLayers] = useState<MapObjectLayer[]>([]);

    // レイヤーを追加
    const addLayer = (data: Plateau3DTile) => {
        if (layers.some((l) => l.data.url === data.url)) return;

        const newLayer: MapObjectLayer = {
            instanceId: crypto.randomUUID(), 
            data: data,
            visible: true,
            color: "#4599a4", 
            opacity: 100,
        };

        setLayers((prev) => [...prev, newLayer]);
    };

    // レイヤーを削除
    const removeLayer = (instanceId: string) => {
        setLayers((prev) => prev.filter((l) => l.instanceId !== instanceId));
    };

    // レイヤー情報を更新
    const updateLayer = (instanceId: string, updates: Partial<MapObjectLayer>) => {
        setLayers((prev) =>
            prev.map((l) => (l.instanceId === instanceId ? { ...l, ...updates } : l))
        );
    };

    return (
        <MapObjectContext.Provider value={{ layers, addLayer, removeLayer, updateLayer }}>
            {children}
        </MapObjectContext.Provider>
    );
};