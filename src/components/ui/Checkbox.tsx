import { CheckIcon } from "@heroicons/react/24/outline";

interface CheckboxProps {
  isChecked: boolean;
  onChange: () => void;
  id: string | number;
}

export const Checkbox = ({ isChecked, onChange, id }: CheckboxProps) => {
  return (
    <label className="group relative flex cursor-pointer items-center justify-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="peer sr-only"
        name={`checkbox-task-${id}`}
        id={`checkbox-task-${id}`}
      />

      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-stone-400 bg-white transition-all duration-200 group-hover:border-indigo-400 peer-checked:border-indigo-600 peer-checked:bg-indigo-600">
        <CheckIcon
          className={`h-4 w-4 stroke-3 transition-all duration-200 ease-out ${
            isChecked
              ? "scale-100 text-white opacity-100"
              : "scale-50 text-indigo-400 opacity-0 group-hover:scale-100 group-hover:opacity-100"
          } `}
        />
      </div>
    </label>
  );
};
