import { useState } from "react";
import { useTodo } from "../contexts/ToDoContext";
import { Button } from "./Button";
import { useError } from "../hooks/useError";
import { actionOnKeyDown } from "../utils/actionOnKeyDown";

export const AddNewTask = () => {
  const { addTask } = useTodo();
  const [inputName, setInputName] = useState("");
  const { isError, showError } = useError();

  const handleTaskName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(ev.target.value);
  };

  const handleAddTask = () => {
    if (inputName.trim() === "") {
      showError("Você não pode adicionar uma tarefa sem um nome");
      return;
    }
    addTask({ taskName: inputName });
    setInputName("");
  };
  return (
    <>
      <div className="w-full flex mb-2">
        <input
          type="text"
          className="bg-white w-full"
          onChange={handleTaskName}
          value={inputName}
          onKeyDown={(ev) => actionOnKeyDown(ev, "Enter", handleAddTask)}
        />
        <Button onClick={handleAddTask}>+</Button>
      </div>
      {isError.errorStatus && <p className="text-red-500">{isError.errorMessage}</p>}
    </>
  );
};
