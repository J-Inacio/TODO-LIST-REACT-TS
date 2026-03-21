import { CheckIcon } from "@heroicons/react/24/outline";

interface CheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

export const Checkbox = ({ isChecked, onChange }: CheckboxProps) => {
  return (
    <label className="relative flex items-center justify-center cursor-pointer group">
      <input type="checkbox" checked={isChecked} onChange={onChange} className="sr-only peer" />

      <div
        className="
      flex items-center justify-center 
      w-6 h-6 rounded-full border-2 
      border-stone-400 bg-white 
      group-hover:border-indigo-400
      peer-checked:bg-indigo-600
      peer-checked:border-indigo-600 
      transition-all duration-200"
      >
        <CheckIcon
          className={`
            w-4 h-4 transition-all duration-200 ease-out stroke-3 
            ${
              isChecked
                ? "opacity-100 scale-100 text-white"
                : "opacity-0 scale-50 text-indigo-400 group-hover:opacity-100 group-hover:scale-100"
            }
          `}
        />
      </div>
    </label>
  );
};
