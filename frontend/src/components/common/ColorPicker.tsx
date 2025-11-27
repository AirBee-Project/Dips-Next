import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { CirclePicker, AlphaPicker, type ColorResult, type RGBColor } from "react-color";
import { useClickOutside } from "../../hooks/useClickOutside";

type Props = {
    color: string;
    alpha: number;
    onChange: (color: string, alpha: number) => void;
    onClose: () => void;
    lazyUpdate?: boolean;
    triggerRect: DOMRect | null;
};


const hexToRgb = (hex: string, alpha: number): RGBColor => {
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return { r, g, b, a: alpha / 100 };
};

const rgbToHexAlpha = (rgb: RGBColor) => {
    const hex = "#" +
        ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b)
            .toString(16).slice(1).toUpperCase();
    const alpha = Math.round((rgb.a || 1) * 100);
    return { hex, alpha };
};

export default function ColorPicker({
    color,
    alpha,
    onChange,
    onClose,
    lazyUpdate = false,
    triggerRect
}: Props) {

    const [internalColor, setInternalColor] = useState<RGBColor>(hexToRgb(color, alpha));
    const pickerRef = useRef<HTMLDivElement>(null);

    const handleConfirmAndClose = () => {
        const { hex, alpha } = rgbToHexAlpha(internalColor);
        onChange(hex, alpha);
        onClose();
    };

    // 外側クリック
    useClickOutside(pickerRef, handleConfirmAndClose);

    const handleChange = (c: ColorResult) => {
        setInternalColor(c.rgb);
        if (!lazyUpdate) {
            const { hex, alpha } = rgbToHexAlpha(c.rgb);
            onChange(hex, alpha);
        }
    };

    // 表示位置
    const [position, setPosition] = useState<React.CSSProperties>({});

    useEffect(() => {
        if (triggerRect) {
            let top = triggerRect.bottom;
            let left = triggerRect.right;
            setPosition({ top, left });
        }
    }, [triggerRect]);

    return createPortal(
        <div
            ref={pickerRef}
            className="fixed z-[9999] w-90 bg-white border-[3px] border-gray-100 rounded-md shadow-2xl overflow-hidden font-sans p-3 cursor-default animate-in fade-in zoom-in-95 duration-100 origin-top-right"
            style={position}
            onClick={(e) => e.stopPropagation()}
        >



            {/* CirclePicker */}
            <div className="mb-4 flex justify-center">
                <CirclePicker
                    color={internalColor}
                    onChange={handleChange}
                    width="100%"
                    circleSize={22}
                    circleSpacing={11}
                    colors={[
                        "#607d8b", "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#00bcd4", "#009688", "#4caf50",
                        "#78909c", "#ef5350", "#ec407a", "#ab47bc", "#7e57c2", "#5c6bc0", "#42a5f5", "#26c6da", "#26a69a", "#66bb6a",
                        "#90a4ae", "#e57373", "#f06292", "#ba68c8", "#9575cd", "#7986cb", "#64b5f6", "#4dd0e1", "#4db6ac", "#81c784",
                        "#b0bec5", "#ef9a9a", "#f48fb1", "#ce93d8", "#b39ddb", "#9fa8da", "#90caf9", "#80deea", "#80cbc4", "#a5d6a7",
                        "#cfd8dc", "#ffcdd2", "#f8bbd0", "#e1bee7", "#d1c4e9", "#c5cae9", "#bbdefb", "#b2ebf2", "#b2dfdb", "#c8e6c9",
                    ]}
                />
            </div>

            {/* 透明度 */}
            <div className="mb-2 px-2 flex items-center gap-3">
                <div className="text-xs font-bold text-gray-400 w-7 text-right h-4">
                    <span>{Math.round((internalColor.a || 1) * 100)}%</span>
                </div>
                <div className="flex-1 relative h-4 flex items-center">
                    <AlphaPicker
                        color={internalColor}
                        onChange={handleChange}
                        width="100%"
                        height="12px"
                        styles={{ default: { picker: { borderRadius: '4px', boxShadow: 'none', border: '1px solid #e5e7eb' } } }}
                        {...({
                            pointer: () => (
                                <div
                                    style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        backgroundColor: '#ffffff',
                                        boxShadow: `0 0 0 8px rgba(${internalColor.r}, ${internalColor.g}, ${internalColor.b}, 0.5), 0 2px 5px rgba(0,0,0,0.2)`,
                                        transform: 'translate(-10px, 0px)',
                                        cursor: 'pointer',
                                    }}
                                />
                            )
                        } as any)}
                    />
                </div>
            </div>

        </div>,
        document.body
    );
}