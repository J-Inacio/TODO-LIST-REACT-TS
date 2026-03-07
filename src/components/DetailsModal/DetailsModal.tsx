import { useEffect, useState } from "react";
import { useTodo, type TaskInterface } from "../../contexts/ToDoContext";
import { AnimatePresence, motion } from "motion/react";
import { actionOnKeyDown } from "../../utils/actionOnKeyDown";

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskInterface | null;
}

export const DetailsModal = ({ isOpen, onClose, task }: DetailsModalProps) => {
  const { updateTask } = useTodo();

  const [inputDescription, setInputDescription] = useState("");

  useEffect(() => {
    if (isOpen && task) {
      setInputDescription(task.description || "");
    } else if (!isOpen) {
      setInputDescription("");
    }
  }, [isOpen, task]);

  const handleOnEnter = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
    actionOnKeyDown(ev, "Enter", handleUpdateDescription);
  };

  const handleUpdateDescription = () => {
    if (!task) return;
    updateTask(task.taskID, { description: inputDescription });
  };

  return (
    <AnimatePresence>
      {isOpen && task && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50"
          onClick={onClose}
        >
          <motion.div
            key="modal-content"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 w-full md:w-lg h-full bg-amber-50 p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-3xl mb-2 font-bold">{task.taskName}</h2>
              <div
                className={`${task.isChecked ? "bg-emerald-600" : "bg-blue-600"} py-1 px-2 w-fit h-fit rounded-md `}
              >
                {task.isChecked ? "Concluído" : "Em andamento"}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-2xl">
                Descrição:
              </label>
              <div className="w-full flex mb-2">
                <textarea
                  id="description"
                  className="bg-white w-full resize-none p-2"
                  onChange={(ev) => setInputDescription(ev.target.value)}
                  value={inputDescription}
                  onKeyDown={handleOnEnter}
                  onBlur={() => updateTask(task.taskID, { description: inputDescription })}
                  maxLength={300}
                  rows={5}
                  spellCheck={true}
                />
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Tarefa Criada em: {new Date(task.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-8 bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-700"
            >
              Fechar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
