import type { TaskInterface } from "../contexts/ToDoContext";

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskInterface | null;
}

export const DetailsModal = ({ isOpen, onClose, task }: DetailsModalProps) => {
  if (!isOpen || !task) return null;
  return (
    <div className={`fixed inset-0 bg-black/50`} onClick={onClose}>
      <div
        className="absolute right-0 top-0 w-lg h-full bg-amber-50 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl mb-2 font-bold">{task.taskName}</h2>
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl">Descrição:</h3>
          <p>{task.description && ""}</p>

          <p className="">Tarefa Criada em: {task.createdAt}</p>
        </div>
      </div>
    </div>
  );
};
