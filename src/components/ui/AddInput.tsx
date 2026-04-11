import { PlusCircleIcon } from "@heroicons/react/24/solid";

interface AddInputProps {
  onClickBtn?: () => void;
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
  htmlId: string;
  inputValue?: string;
}

export const AddInput = ({
  onClickBtn,
  onChange,
  onKeyDown,
  placeholder,
  className,
  htmlId,
  inputValue,
}: AddInputProps) => {
  return (
    <>
      <label
        className={`relative flex h-10 w-full items-center justify-center rounded-lg transition-all duration-200 focus-within:ring-2 focus-within:ring-indigo-600 hover:ring-2 hover:ring-indigo-400 ${className}`}
      >
        <button className="absolute left-0">
          <PlusCircleIcon
            className="h-7 w-10 cursor-pointer text-stone-700 hover:text-stone-800"
            onClick={onClickBtn}
          />
        </button>

        <input
          id={htmlId}
          placeholder={placeholder}
          type="text"
          className="h-full w-full rounded-lg bg-white indent-10 focus:border-transparent focus:outline-0"
          onChange={onChange}
          value={inputValue}
          onKeyDown={onKeyDown}
        />
      </label>
    </>
  );
};
