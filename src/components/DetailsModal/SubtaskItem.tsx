import { useState } from "react";
import { type SubTaskInterface, useTodo } from "../../contexts/ToDoContext";
import { Button } from "../ui/Button";
import { actionOnKeyDown } from "../../utils/actionOnKeyDown";
import { Checkbox } from "../ui/Checkbox";
import { TrashIcon } from "@heroicons/react/24/solid";

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
    <li className="flex justify-between rounded-lg bg-stone-700 p-2">
      <div className="flex items-center gap-1">
        <Checkbox
          isChecked={subtask.subIsChecked}
          onChange={handleCheckBox}
          id={subtask.subTaskID}
        />
        <input
          id={`subtask-input-${subtask.subTaskID}`}
          name={`subtask-input-${subtask.subTaskID}`}
          type="text"
          onChange={(ev) => setEditName(ev.target.value)}
          value={editName}
          onKeyDown={(ev) => actionOnKeyDown(ev, "Enter", handleSaveName)}
          onBlur={handleSaveName}
          className={`${subtask.subIsChecked ? "text-gray-600 line-through" : "text-amber-50"} h-full rounded-sm indent-1 focus:outline-0`}
        />
      </div>

      <div className="flex gap-1">
        <Button onClick={() => removeSubTask(taskID, subtask.subTaskID)}>
          <TrashIcon className="w-5" />
        </Button>
      </div>
    </li>
  );
};
