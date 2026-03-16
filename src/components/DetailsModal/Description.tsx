import { useEffect, useState } from "react";
import { useTodo, type TaskInterface } from "../../contexts/ToDoContext";

interface DescriptionProps {
  task: TaskInterface | undefined;
}

export const Description = ({ task }: DescriptionProps) => {
  const [inputDescription, setInputDescription] = useState("");

  useEffect(() => {
    setInputDescription(task?.description ?? "");
  }, [task]);
  const { updateTask } = useTodo();

  const handleUpdateDescription = () => {
    if (!task) return;
    updateTask(task.taskID, { description: inputDescription });
  };

  return (
    <>
      <label htmlFor="description" className="text-2xl">
        Descrição:
      </label>
      <div className="w-full flex mb-2">
        <textarea
          id="description"
          className="bg-stone-700 text-amber-50 w-full resize-none p-2"
          onChange={(ev) => setInputDescription(ev.target.value)}
          value={inputDescription}
          onBlur={handleUpdateDescription}
          maxLength={300}
          rows={5}
          spellCheck={true}
        />
      </div>
    </>
  );
};
