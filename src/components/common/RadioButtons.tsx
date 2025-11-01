export interface RadioOption {
  label: string;
  value: string;
}

interface RadioButtonsProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function RadioButtons({
  name,
  options,
  value,
  onChange,
}: RadioButtonsProps) {
  return (
    <div className="flex flex-col gap-1">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center space-x-3 cursor-pointer select-none"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="accent-gray-200 cursor-pointer"
          />
          <span className="text-gray-300 font-medium">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
