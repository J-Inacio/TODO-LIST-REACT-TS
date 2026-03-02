import { useTodo } from "../../contexts/ToDoContext";
import { AddNewTask } from "../AddNewTask";
import { ListItem } from "./ListItem";
export const ListLayout = () => {
  const { tasks } = useTodo();

  return (
    <div className="w-xl h-auto bg-gray-500 p-4 rounded-2xl">
      <AddNewTask />
      <ul>
        {tasks.map((item) => {
          return <ListItem key={item.taskID} item={item} />;
        })}
      </ul>
    </div>
  );
};
