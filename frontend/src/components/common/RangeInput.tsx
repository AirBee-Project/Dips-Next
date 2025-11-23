type Props = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  label?: string; // アクセシビリティ向け
  id?: string;
  className?: string; // スタイリング用
  trackColor?: string; // 棒の色
  thumbColor?: string; // 円の色
};

export default function RangeInput(props: Props) {
  const {
    value,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    disabled,
    label,
    id,
    className,
    trackColor = "#ddd",
    thumbColor = "#4599a4",
  } = props;

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={className} style={{ width: "90%" }}>
      {label && <label htmlFor={id}>{label}</label>}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
        }}
      >
        <span>{min}</span>
        <span>{value}</span>
        <span>{max}</span>
      </div>

      <input
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: "100%",
          appearance: "none",
          height: 8,
          borderRadius: 4,
          background: `linear-gradient(to right, ${trackColor} 0%, ${trackColor} ${percentage}%, #ccc ${percentage}%, #ccc 100%)`,
          outline: "none",
        }}
      />
      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: ${thumbColor};
            border: 6px solid ${thumbColor}80;
            background-clip: padding-box;
            cursor: pointer;
            margin-top: 0px; /* トラックの中央に配置 */
          }
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: ${thumbColor};
            cursor: pointer;
            border: 6px solid ${thumbColor}80;
            background-clip: padding-box;
          }
        `}
      </style>
    </div>
  );
}
