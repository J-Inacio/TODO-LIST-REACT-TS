import { useState } from "react";
import { useError } from "../hooks/useError";
import { actionOnKeyDown } from "../utils/actionOnKeyDown";
import { PlusCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

interface AddNewTaskProps {
  onAdd: (taskName: string) => void;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
}

export const AddNewTask = ({
  onAdd,
  placeholder = "Adicionar nova tarefa...",
  errorMessage = "Por favor, adicione um texto",
}: AddNewTaskProps) => {
  const [inputName, setInputName] = useState("");
  const { isError, showError } = useError();

  const handleTaskName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(ev.target.value);
  };

  const handleAddTask = () => {
    if (inputName.trim() === "") {
      showError(errorMessage);
      return;
    }
    onAdd(inputName);
    setInputName("");
  };
  return (
    <>
      <label className="relative mb-2 flex h-10 w-full items-center justify-center rounded-lg transition-all duration-200 focus-within:ring-2 focus-within:ring-indigo-600 hover:ring-2 hover:ring-indigo-400">
        <button className="absolute left-0">
          <PlusCircleIcon
            className="h-7 w-10 cursor-pointer text-stone-700 hover:text-stone-800"
            onClick={handleAddTask}
          />
        </button>

        <input
          placeholder={placeholder}
          type="text"
          className="h-full w-full rounded-lg bg-white indent-10 focus:border-transparent focus:outline-0"
          onChange={handleTaskName}
          value={inputName}
          onKeyDown={(ev) => actionOnKeyDown(ev, "Enter", handleAddTask)}
        />
      </label>
      {isError.errorStatus && (
        <p className="flex items-center gap-1 pb-2 text-red-500">
          <ExclamationCircleIcon className="h-6 w-6" />
          {isError.errorMessage}
        </p>
      )}
    </>
  );
};
