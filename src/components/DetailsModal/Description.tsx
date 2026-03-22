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
      <div className="mb-2 flex w-full">
        <textarea
          id="description"
          className="w-full resize-none rounded-lg bg-stone-700 p-2 text-amber-50 outline-0 transition-all duration-200 focus-within:ring-2 focus-within:ring-indigo-600 hover:ring-2 hover:ring-indigo-400"
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
