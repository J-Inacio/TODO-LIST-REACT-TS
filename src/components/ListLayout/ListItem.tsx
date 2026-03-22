import { Button } from "../ui/Button";
import { useTodo, type TaskInterface } from "../../contexts/ToDoContext";
import { actionOnKeyDown } from "../../utils/actionOnKeyDown";
import React, { useId, useState } from "react";
import { useError } from "../../hooks/useError";
import { useSetTimeout } from "../../hooks/useSetTimeout";
import { Checkbox } from "../ui/Checkbox";

interface ListItemProps {
  item: TaskInterface;
  onOpenDetails: () => void;
}

export const ListItem = ({ item, onOpenDetails }: ListItemProps) => {
  const { updateTask, removeTask } = useTodo();
  const [inputField, setInputField] = useState(item.taskName);
  const [sucessColor, setSucessColor] = useState(false);
  const { isError, showError } = useError();
  const htmlID = useId();
  const { startTimer } = useSetTimeout(1, () => {
    setSucessColor(false);
  });

  const handleChangeName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputField(ev.target.value);
  };

  const saveTask = () => {
    if (inputField.trim() === "") {
      showError("Você não pode deixar uma tarefa sem nome.");
      setInputField(item.taskName);
      return;
    } else if (inputField === item.taskName) {
      return;
    }
    updateTask(item.taskID, { taskName: inputField });
    setSucessColor(true);

    startTimer();
  };

  const handleSaveChangeName = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    actionOnKeyDown(ev, "Enter", saveTask);
  };

  const handleCheckBox = () => {
    updateTask(item.taskID, { isChecked: !item.isChecked });
  };

  const handleRemoveTask = () => {
    removeTask(item.taskID);
  };

  return (
    <>
      {isError.errorStatus && <p className="text-red-500">{isError.errorMessage}</p>}
      <li className="flex justify-between rounded-sm bg-gray-700 p-2">
        <div className="flex items-center gap-1">
          <Checkbox isChecked={item.isChecked} onChange={handleCheckBox} id={item.taskID} />

          <input
            id={`task-input-${htmlID}`}
            type="text"
            onChange={handleChangeName}
            value={inputField}
            onKeyDown={handleSaveChangeName}
            onBlur={saveTask}
            className={`${item.isChecked ? "text-gray-600 line-through" : "text-amber-50"} ${sucessColor ? "text-emerald-600" : ""} h-full rounded-sm indent-1 focus:outline-0`}
          />
        </div>

        <div className="flex gap-1">
          <Button onClick={onOpenDetails}>Detalhes</Button>
          <Button onClick={handleRemoveTask}>Excluir</Button>
        </div>
      </li>
    </>
  );
};
