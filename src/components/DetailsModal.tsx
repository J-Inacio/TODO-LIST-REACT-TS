import type { TaskInterface } from "../contexts/ToDoContext";
import { AnimatePresence, motion } from "motion/react";

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskInterface | null;
}

export const DetailsModal = ({ isOpen, onClose, task }: DetailsModalProps) => {
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
            className="absolute right-0 top-0 w-lg h-full bg-amber-50 p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl mb-2 font-bold">{task.taskName}</h2>
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl">Descrição:</h3>
              <p>{task.description || "Sem descrição disponível."}</p>
              <p className="mt-4 text-sm text-gray-500">Tarefa Criada em: {task.createdAt}</p>
            </div>
            <button onClick={onClose} className="mt-8 bg-indigo-600 text-white px-4 py-2 rounded">
              Fechar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
