import { useState } from "react";

type ColorState = {
    hex: string;
    alpha: number;
};

export function useSaveColor(key: string, defaultHex: string = "#4599a4", defaultAlpha: number = 100) {

    const [colorState, setColorState] = useState<ColorState>(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : { hex: defaultHex, alpha: defaultAlpha };
        } catch (e) {
            return { hex: defaultHex, alpha: defaultAlpha };
        }
    });

    const setColor = (hex: string, alpha: number) => {
        const newState = { hex, alpha };
        setColorState(newState);
        localStorage.setItem(key, JSON.stringify(newState));
    };

    return [colorState, setColor] as const;
}