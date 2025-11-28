import { useState, useRef } from "react";
import { useSaveColor } from "../../hooks/useSaveColor";
import ColorPicker from "./ColorPicker";

type Props = {
    storageKey: string;
    defaultColor?: string;
    className?: string;
    onColorChange?: (color: string, alpha: number) => void;
};

export default function ColorPickerButton({
    storageKey,
    defaultColor = "#4599a4",
    className = "",
    onColorChange,
}: Props) {

    const [isOpen, setIsOpen] = useState(false);

    const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const [colorState, setColor] = useSaveColor(storageKey, defaultColor);

    const handleColorChange = (c:string, a: number)=> {
        setColor(c,a);
        if (onColorChange){
            onColorChange(c,a);
        }
    };

    const togglePicker = () => {
        if (!isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setButtonRect(rect);
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    return (
        <div className={`relative ${className}`}>

            <button
                ref={buttonRef}
                onClick={togglePicker}
                className="w-3 h-3 rounded-[3px] hover:scale-110 transition-transform cursor-pointer block"
                style={{
                    backgroundColor: colorState.hex,
                    opacity: colorState.alpha / 100
                }}
                title="カラー設定"
            />

            {isOpen && buttonRect && (
                <ColorPicker
                    color={colorState.hex}
                    alpha={colorState.alpha}
                    onChange={handleColorChange}
                    onClose={() => setIsOpen(false)}
                    lazyUpdate={true}
                    triggerRect={buttonRect}
                />
            )}
        </div>
    );
}