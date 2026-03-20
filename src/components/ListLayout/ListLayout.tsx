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
  const [listIsOpen, setListIsOpen] = useState(false);
  const handleCloseModal = () => setSelectedTask(null);
  return (
    <>
      <div className="w-xl h-auto bg-gray-500 p-4 rounded-2xl">
        <AddNewTask />
        <div>
          <span></span>
          <h3>Todas tarefas</h3>
        </div>
        <DropDownList
          isOpen={listIsOpen}
          setIsOpen={() => setListIsOpen(!listIsOpen)}
          listName="Concluídas"
        >
          <li>teste</li>
          <li>teste</li>
          <li>teste</li>
          <li>teste</li>
          <li>teste</li>
          <li>teste</li>
          <li>teste</li>
          <li>teste</li>
          <li>teste</li>
          <li>teste</li>
          <li>teste</li>
        </DropDownList>

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
