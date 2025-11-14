import React, { useState, useRef, useEffect } from "react";

// パース結果の型定義
export interface ParsedPart {
  text: string;
  separator: string;
}

// パーサー関数の型定義
export type Parser = (text: string) => ParsedPart[];

// ColoredInputコンポーネントのProps型定義
export interface ColoredInputProps {
  value: string;
  onChange: (value: string) => void;
  parser: Parser;
  colors?: string[];
  placeholder?: string;
  className?: string;
  textareaClassName?: string;
}

// 再利用可能なColoredInputコンポーネント
export function ColoredInput({
  value,
  onChange,
  parser,
  colors,
  placeholder = "",
  className = "",
  textareaClassName = "",
}: ColoredInputProps) {
  const defaultColors: string[] = [
    "#ffcdd2",
    "#f8bbd0",
    "#e1bee7",
    "#d1c4e9",
    "#c5cae9",
  ];
  const finalColors: string[] = colors || defaultColors;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const coloredDivRef = useRef<HTMLDivElement>(null);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  // カーソル座標
  const [cursorCoordinates, setCursorCoordinates] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });

  // テキストエリアの高さを自動調整
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  // 選択状態の管理
  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setIsSelecting(target.selectionStart !== target.selectionEnd);
    updateCursorCoordinates();
  };
  const handleMouseUp = () => {
    if (textareaRef.current) {
      setIsSelecting(
        textareaRef.current.selectionStart !== textareaRef.current.selectionEnd
      );
      updateCursorCoordinates();
    }
  };
  const handleKeyUp = () => {
    if (textareaRef.current) {
      setIsSelecting(
        textareaRef.current.selectionStart !== textareaRef.current.selectionEnd
      );
      updateCursorCoordinates();
    }
  };

  // カーソル位置の更新（修正版）
  const updateCursorCoordinates = () => {
    if (!textareaRef.current || !coloredDivRef.current) return;

    const pos = textareaRef.current.selectionStart;
    const div = coloredDivRef.current;

    // 既存の測定用要素をクリア
    const oldSpan = div.querySelector(".cursor-measure");
    if (oldSpan) {
      oldSpan.remove();
    }

    // 測定用の要素を作成
    const measureDiv = document.createElement("div");
    measureDiv.className = "cursor-measure";
    measureDiv.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      white-space: pre-wrap;
      word-wrap: break-word;
      visibility: hidden;
      pointer-events: none;
    `;

    // カーソル位置までのテキストを挿入
    const textBeforeCursor = value.slice(0, pos);
    measureDiv.textContent = textBeforeCursor;

    // カーソル位置マーカーを追加
    const cursorMarker = document.createElement("span");
    cursorMarker.style.cssText = "display: inline;";
    measureDiv.appendChild(cursorMarker);

    div.appendChild(measureDiv);

    // カーソルマーカーの位置を取得
    const markerRect = cursorMarker.getBoundingClientRect();
    const parentRect = div.getBoundingClientRect();

    setCursorCoordinates({
      top: markerRect.top - parentRect.top + 3,
      left: markerRect.left - parentRect.left,
    });

    // 測定用要素を削除
    div.removeChild(measureDiv);
  };

  // 色付きテキストの描画
  const renderColoredText = () => {
    const parts: ParsedPart[] = parser(value);
    return parts.map((part: ParsedPart, index: number) => (
      <React.Fragment key={index}>
        <span
          style={{
            backgroundColor: finalColors[index % finalColors.length],
            borderRadius: "3px",
            padding: "1px",
          }}
        >
          {part.text}
        </span>
        <span className="text-gray-200">{part.separator}</span>
      </React.Fragment>
    ));
  };

  return (
    <div className={`relative w-full ${className}`}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={1}
        className={`w-full text-base border-2 bg-transparent relative z-20 caret-transparent resize-none overflow-hidden font-inherit leading-6 outline-0 ${textareaClassName} text-1xl`}
        onSelect={handleSelect}
        onMouseUp={handleMouseUp}
        onKeyUp={handleKeyUp}
        style={{ color: "transparent" }}
      />
      <div
        ref={coloredDivRef}
        className="absolute top-0 left-0 text-base pointer-events-none z-10 w-full whitespace-pre-wrap wrap-break-word font-inherit transition-opacity duration-100 text-1xl leading-6"
        style={{
          opacity: isSelecting ? 0 : 1,
          padding: textareaRef.current?.style.padding || "0",
        }}
      >
        {value ? (
          renderColoredText()
        ) : (
          <span className="text-gray-300">{placeholder}</span>
        )}

        {/* カーソル表示 */}
        {!isSelecting && (
          <div
            className="animate-pulse"
            style={{
              position: "absolute",
              top: cursorCoordinates.top,
              left: cursorCoordinates.left,
              width: "2px",
              height: "1.2em",
              backgroundColor: "black",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </div>
  );
}
