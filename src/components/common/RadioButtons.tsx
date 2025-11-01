export interface RadioOption<T> {
  label: string;
  value: T;
}

interface RadioButtonsProps<T> {
  name: string;
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function RadioButtons<T>({
  name,
  options,
  value,
  onChange,
}: RadioButtonsProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      {options.map((opt) => (
        <label
          key={String(opt.value)}
          className="flex items-center space-x-3 cursor-pointer select-none"
        >
          <input
            type="radio"
            name={name}
            value={String(opt.value)}
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
