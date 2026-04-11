import { useState } from "react";
import { useError } from "../hooks/useError";
import { actionOnKeyDown } from "../utils/actionOnKeyDown";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { AddInput } from "./ui/AddInput";

interface AddNewTaskProps {
  onAdd: (taskName: string) => void;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
  htmlInputId: string;
}

export const AddNewTask = ({
  onAdd,
  placeholder = "Adicionar nova tarefa...",
  errorMessage = "Por favor, adicione um texto",
  htmlInputId,
  className,
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
      <AddInput
        onClickBtn={handleAddTask}
        htmlId={htmlInputId}
        placeholder={placeholder}
        onChange={handleTaskName}
        inputValue={inputName}
        onKeyDown={(ev) => actionOnKeyDown(ev, "Enter", handleAddTask)}
        className={className}
      />

      {isError.errorStatus && (
        <p className="flex items-center gap-1 pb-2 text-red-500">
          <ExclamationCircleIcon className="h-6 w-6" />
          {isError.errorMessage}
        </p>
      )}
    </>
  );
};
