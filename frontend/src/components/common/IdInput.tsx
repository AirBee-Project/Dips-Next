import { useState, useRef, useEffect, type KeyboardEvent, type MouseEvent, type FocusEvent } from "react";

type Props = {
    value: string[];
    onChange: (ids: string[]) => void;
    placeholder?: string;
    className?: string;
};

export default function IdInput({
    value,
    onChange,
    placeholder,
    className = ""
}: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState("");
    const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());

    const containerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }

    // 編集モードの開始
    const startEditing = () => {
        setText(value.join(" "));
        setIsEditing(true);
        setSelectedIndices(new Set());
    };

    // フォーカス制御
    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
            const len = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(len, len);
            adjustHeight();
        }
    }, [isEditing]);

    // 編集終了
    const handleBlur = () => {
        const newIds = text
            .split(/,|\n|\s+/)
            .map((s) => s.trim())
            .filter((s) => s !== "");

        onChange(newIds);
        setIsEditing(false);
    };

    const handleContainerBlur = (e: FocusEvent<HTMLDivElement>) => {
        if (containerRef.current?.contains(e.relatedTarget as Node)) return;
        setSelectedIndices(new Set());
    };


    // タグのクリック
    const handleTagClick = (e: MouseEvent, index: number) => {
        e.stopPropagation();
        const newSelected = new Set(selectedIndices);

        if (newSelected.has(index)) {
            newSelected.delete(index);
        } else {
            newSelected.add(index);
        }
        setSelectedIndices(newSelected);
    };

    // キーボード操作
    const handleKeyDownView = (e: KeyboardEvent) => {
        if (isEditing) return;

        if (e.key === "Backspace" || e.key === "Delete") {
            if (selectedIndices.size > 0) {
                const newIds = value.filter((_, i) => !selectedIndices.has(i));
                onChange(newIds);
                setSelectedIndices(new Set());
            }
        }

        if ((e.ctrlKey || e.metaKey) && e.key === "a") {
            e.preventDefault();
            setSelectedIndices(new Set(value.map((_, i) => i)));
        }

        if (e.key === "Enter") {
            e.preventDefault();
            startEditing();
        }
    };

    const handleKeyDownEdit = (e: KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleBlur();
        }
    };

    return (
        <div
            className={`w-full outline-none ${className}`}
            tabIndex={0}
            onKeyDown={handleKeyDownView}
            onBlur={handleContainerBlur}
            ref={containerRef}
        >
            {isEditing ? (
                // 編集モード
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => { setText(e.target.value); adjustHeight(); }}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDownEdit}
                    rows={1}
                    className="w-full p-0 border-none outline-none resize-none text-gray-400 text-base font-bold bg-transparent overflow-hidden font-sans leading-relaxed"

                />
            ) : (
                // 閲覧モード
                <div
                    onClick={startEditing}
                    className="w-full cursor-text bg-transparent min-h-[10px] flex flex-wrap gap-1 transition-all"
                >
                    {value.length > 0 ? (
                        value.map((id, index) => {
                            const isSelected = selectedIndices.has(index);
                            return (
                                <div
                                    key={index}
                                    onClick={(e) => handleTagClick(e, index)}
                                    onDoubleClick={(e) => {
                                        e.stopPropagation();
                                        startEditing();
                                    }}
                                    className={`
                    flex items-center px-1 py-0 rounded-sm text-base font-bold border-1 cursor-pointer select-none transition-all
                    ${isSelected
                                            ? "bg-accent-100 text-gray-300 border-accent-300"
                                            : "bg-gray-100/30 text-gray-300 border-transparent hover:bg-accent-200/20"
                                        }
                  `}
                                >
                                    <span>{id}</span>
                                </div>
                            );
                        })
                    ) : (
                        <span className="text-gray-100 text-base font-bold select-none">{placeholder}</span>
                    )}
                </div>
            )}
        </div>
    );
}