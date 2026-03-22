import { useState } from "react";
import { type TaskInterface, useTodo } from "../../contexts/ToDoContext";
import { AddNewTask } from "../AddNewTask";
import { DetailsModal } from "../DetailsModal/DetailsModal";
import { ListItem } from "./ListItem";
import { AnimatePresence, motion } from "motion/react";
import { DropDownList } from "../DropDownList";
export const ListLayout = () => {
  const { tasks, addTask } = useTodo();
  const [selectedTask, setSelectedTask] = useState<TaskInterface | null>(null);
  const handleCloseModal = () => setSelectedTask(null);
  const completedTasks = tasks.filter((t) => t.isChecked);
  const inProgressTasks = tasks.filter((t) => !t.isChecked);

  const dropdownData = [
    { title: "Em andamento", listData: inProgressTasks },
    { title: "Todas tarefas", listData: tasks },
    { title: "Concluídas", listData: completedTasks },
  ] as const;

  return (
    <>
      <div className="h-auto w-xl rounded-2xl bg-gray-500 p-4">
        <AddNewTask
          onAdd={(name) => addTask({ taskName: name })}
          placeholder="Adicione uma nova tarefa principal"
          htmlInputId="todoAddInput"
        />
        <div className="flex flex-col gap-2">
          {dropdownData.map((list) => (
            <DropDownList listName={list.title} key={list.title}>
              <div className="flex flex-col">
                <AnimatePresence>
                  {list.listData.map((item) => (
                    <motion.div
                      key={item.taskID}
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
                      <ListItem item={item} onOpenDetails={() => setSelectedTask(item)} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </DropDownList>
          ))}
        </div>

        <AnimatePresence>
          {selectedTask && <DetailsModal onClose={handleCloseModal} id={selectedTask.taskID} />}
        </AnimatePresence>
      </div>
    </>
  );
};
