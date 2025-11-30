import React, { useState, useEffect, useRef } from "react";

type ButtonWithCircleProps = {
  onEdit: (type: "AND" | "OR") => void; // startEditをpropsで受け取る
};

export default function ButtonWithCircle({ onEdit }: ButtonWithCircleProps) {
  const [selected, setSelected] = useState<"AND" | "OR" | "">("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (type: "AND" | "OR") => {
    setSelected(type);
    onEdit(type);
  };

  // 外部クリックで選択解除
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // targetにdata-key属性があり、それが数字なら解除しない
      const keyAttr = target.getAttribute("data-key");
      if (keyAttr !== null && !isNaN(Number(keyAttr))) {
        return;
      }

      if (containerRef.current && !containerRef.current.contains(target)) {
        setSelected("");
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex gap-3">
      <div className="flex justify-start items-center cursor-pointer" onClick={() => handleClick("AND")}>
        <div className="relative w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
          {selected === "AND" && <div className="w-3 h-3 rounded-full bg-white" />}
        </div>
        <button className="m-2" data-key="0">AND</button>
      </div>

      <div className="flex justify-start items-center cursor-pointer" onClick={() => handleClick("OR")}>
        <div className="relative w-6 h-6 rounded-full bg-green-400 flex items-center justify-center">
          {selected === "OR" && <div className="w-3 h-3 rounded-full bg-white" />}
        </div>
        <button className="m-2" data-key="1">OR</button>
      </div>
    </div>
  );
}
