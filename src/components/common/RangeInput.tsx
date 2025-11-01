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
};

export default function RangeInput(props: Props) {
  return (
    <div className={props.className}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        type="range"
        id={props.id}
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        disabled={props.disabled}
        onChange={(e) => props.onChange(Number(e.target.value))}
      />
    </div>
  );
}
