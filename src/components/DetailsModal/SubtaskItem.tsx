import { useState } from "react";
import { type SubTaskInterface, useTodo } from "../../contexts/ToDoContext";
import { Button } from "../Button";
import { actionOnKeyDown } from "../../utils/actionOnKeyDown";

interface SubtaskItemProps {
  subtask: SubTaskInterface;
  taskID: number;
}

export const SubtaskItem = ({ subtask, taskID }: SubtaskItemProps) => {
  const { removeSubTask, updateSubTask } = useTodo();

  const [editName, setEditName] = useState(subtask.subTaskName);

  const handleCheckBox = () => {
    updateSubTask(taskID, subtask.subTaskID, { subIsChecked: !subtask.subIsChecked });
  };

  const handleSaveName = () => {
    if (editName.trim() === "") {
      setEditName(subtask.subTaskName);
      return;
    }
    if (editName === subtask.subTaskName) return;

    updateSubTask(taskID, subtask.subTaskID, { subTaskName: editName });
  };

  return (
    <div className="flex gap-2 mb-2 w-full">
      <input
        type="checkbox"
        checked={subtask.subIsChecked}
        onChange={handleCheckBox}
        className="w-6 cursor-pointer"
      />
      <input
        value={editName}
        onChange={(ev) => setEditName(ev.target.value)}
        onBlur={handleSaveName}
        onKeyDown={(ev) => actionOnKeyDown(ev, "Enter", handleSaveName)}
        className="bg-stone-700 text-amber-50 w-full indent-2"
      />
      <Button onClick={() => removeSubTask(taskID, subtask.subTaskID)}>Excluir</Button>
    </div>
  );
};
