import { useState } from "react";
import { type TaskInterface, useTodo } from "../../contexts/ToDoContext";
import { AddNewTask } from "../AddNewTask";
import { DetailsModal } from "../DetailsModal/DetailsModal";
import { ListItem } from "./ListItem";
import { AnimatePresence } from "motion/react";
export const ListLayout = () => {
  const { tasks } = useTodo();
  const [selectedTask, setSelectedTask] = useState<TaskInterface | null>(null);
  const handleCloseModal = () => setSelectedTask(null);
  return (
    <>
      <div className="w-xl h-auto bg-gray-500 p-4 rounded-2xl">
        <AddNewTask />
        <ul>
          {tasks.map((item) => {
            return (
              <ListItem key={item.taskID} item={item} onOpenDetails={() => setSelectedTask(item)} />
            );
          })}
        </ul>
        <AnimatePresence>
          {selectedTask && <DetailsModal onClose={handleCloseModal} id={selectedTask.taskID} />}
        </AnimatePresence>
      </div>
    </>
  );
};
