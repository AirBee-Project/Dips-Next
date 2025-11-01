export interface RadioOption {
  label: string;
  value: string;
}

interface RadioButtonsProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  direction?: "horizontal" | "vertical";
}

export default function RadioButtons({
  name,
  options,
  value,
  onChange,
  direction = "vertical",
}: RadioButtonsProps) {
  return (
    <div
      className={`flex ${
        direction === "horizontal" ? "flex-row space-x-4" : "flex-col space-y-2"
      }`}
    >
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center space-x-2 cursor-pointer select-none"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="accent-blue-600 cursor-pointer"
          />
          <span className="text-gray-700 text-sm">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
