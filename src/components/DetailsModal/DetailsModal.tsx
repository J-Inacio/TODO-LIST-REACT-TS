import { useTodo } from "../../contexts/ToDoContext";
import { formatDate } from "../../utils/formatDate";
import { AnimatePresence, motion } from "framer-motion";
import { SubtaskItem } from "./SubtaskItem";
import { Description } from "./Description";
import { AddNewTask } from "../AddNewTask";

interface DetailsModalProps {
  onClose: () => void;
  id: number | null;
}

export const DetailsModal = ({ onClose, id }: DetailsModalProps) => {
  const { addSubTask, tasks } = useTodo();
  const liveTask = tasks.find((t) => t.taskID === id);
  const totalSubtasks = liveTask?.subtasks?.length ?? 0;
  const hasSubtask = totalSubtasks > 0;
  const subTasksCompleted = liveTask?.subtasks?.filter((t) => t.subIsChecked).length ?? 0;
  const progressPercentage = hasSubtask ? Math.round((subTasksCompleted / totalSubtasks) * 100) : 0;

  const handleAddSubTask = (name: string) => {
    if (!liveTask) return;
    addSubTask(liveTask.taskID, name);
  };

  return (
    <motion.div
      key="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        key="modal-content"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute top-0 right-0 h-full w-full bg-gray-500 p-4 shadow-2xl md:w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="mb-2 text-3xl font-bold">{liveTask?.taskName}</h2>
          <div
            className={`${liveTask?.isChecked ? "bg-emerald-600" : "bg-indigo-600"} h-fit w-fit rounded-md px-2 py-1 text-amber-50`}
          >
            {liveTask?.isChecked ? "Concluído" : "Em andamento"}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Description task={liveTask} />
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl">SubTarefas:</h3>
            <AddNewTask
              onAdd={handleAddSubTask}
              placeholder="Adicione uma nova subtarefa"
              htmlInputId="subtaskAddInput"
            />
            {hasSubtask && (
              <div className="h-3 overflow-hidden rounded-full bg-white">
                <div
                  className={`h-full transition-all duration-300 ease-out ${progressPercentage === 100 ? "bg-emerald-600" : "bg-indigo-600"} `}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <AnimatePresence>
                {liveTask?.subtasks?.map((subtask) => {
                  return (
                    <motion.div
                      key={subtask.subTaskID}
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: "auto", marginBottom: 4 }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        marginBottom: 0,
                        scale: 0.9,
                        transition: {
                          opacity: { duration: 0.2 },
                          scale: { duration: 0.2 },
                          height: { delay: 0.2, duration: 0.2 },
                          marginBottom: { delay: 0.2, duration: 0.2 },
                        },
                      }}
                      transition={{ duration: 0.25 }}
                      layout
                      className="overflow-hidden"
                    >
                      <SubtaskItem
                        subtask={subtask}
                        taskID={liveTask.taskID}
                        key={subtask.subTaskID}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <p className="mt-4 text-sm text-white">
            Tarefa Criada em: {formatDate(liveTask?.createdAt)}
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-8 cursor-pointer rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Fechar
        </button>
      </motion.div>
    </motion.div>
  );
};
