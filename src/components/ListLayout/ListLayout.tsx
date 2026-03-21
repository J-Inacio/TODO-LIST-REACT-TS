import { useState } from "react";
import { type TaskInterface, useTodo } from "../../contexts/ToDoContext";
import { AddNewTask } from "../AddNewTask";
import { DetailsModal } from "../DetailsModal/DetailsModal";
import { ListItem } from "./ListItem";
import { AnimatePresence } from "motion/react";
import { DropDownList } from "../DropDownList";
export const ListLayout = () => {
  const { tasks } = useTodo();
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
      <div className="w-xl h-auto bg-gray-500 p-4 rounded-2xl">
        <AddNewTask />
        <div className="flex flex-col gap-2">
          {dropdownData.map((list) => (
            <DropDownList listName={list.title} key={list.title}>
              <div className="flex flex-col gap-1">
                {list.listData.map((item) => (
                  <ListItem
                    key={item.taskID}
                    item={item}
                    onOpenDetails={() => setSelectedTask(item)}
                  />
                ))}
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
