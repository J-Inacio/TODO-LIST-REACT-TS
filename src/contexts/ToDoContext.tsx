import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { generateId } from "../utils/generateId";

export interface SubTaskInterface {
  subTaskID: string;
  subTaskName: string;
  subIsChecked: boolean;
}

export interface TaskInterface {
  taskID: number;
  taskName: string;
  createdAt: string;
  isChecked: boolean;
  description: string;
  subtasks: SubTaskInterface[];
  completeDate: string | null;
}
type TaskData = Omit<
  TaskInterface,
  "taskID" | "createdAt" | "isChecked" | "description" | "subtasks" | "completeDate"
>;

interface ToDoContextType {
  tasks: TaskInterface[];
  addTask: (task: TaskData) => void;
  removeTask: (id: number) => void;
  updateTask: (id: number, updatedFields: Partial<TaskInterface>) => void;
  addSubTask: (id: number, subTaskName: string) => void;
  removeSubTask: (id: number, subTaskID: string) => void;
  updateSubTask: (id: number, subTaskID: string, updatedFields: Partial<SubTaskInterface>) => void;
  isLoading: boolean;
}

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export const ToDoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useLocalStorage<TaskInterface[]>("tarefas-todo", []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const addTask = (taskData: TaskData) => {
    const newTask: TaskInterface = {
      ...taskData,
      taskID: generateId(),
      createdAt: new Date().toISOString(),
      isChecked: false,
      description: "",
      subtasks: [],
      completeDate: null,
    };
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const addSubTask = (id: number, subTaskName: string) => {
    const newSubTask: SubTaskInterface = {
      subTaskID: `${id}S${generateId()}`,
      subTaskName: subTaskName,
      subIsChecked: false,
    };

    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.taskID === id) {
          return {
            ...task,
            subtasks: [newSubTask, ...task.subtasks],
          };
        }

        return task;
      }),
    );
  };

  const removeSubTask = (id: number, subTaskID: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.taskID === id) {
          return {
            ...task,
            subtasks: task.subtasks.filter((subtask) => subtask.subTaskID !== subTaskID),
          };
        }

        return task;
      }),
    );
  };

  const updateSubTask = (
    taskID: number,
    subTaskID: string,
    updatedFields: Partial<SubTaskInterface>,
  ) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.taskID === taskID) {
          return {
            ...task,
            subtasks: task.subtasks.map((subtask) =>
              subtask.subTaskID === subTaskID ? { ...subtask, ...updatedFields } : subtask,
            ),
          };
        }
        return task;
      }),
    );
  };

  const removeTask = (id: number) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.taskID !== id));
  };

  const updateTask = (id: number | undefined, updatedFields: Partial<TaskInterface>) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.taskID === id ? { ...task, ...updatedFields } : task)),
    );
  };

  const value = {
    tasks,
    addTask,
    removeTask,
    updateTask,
    addSubTask,
    removeSubTask,
    updateSubTask,
    isLoading,
  };

  return (
    <ToDoContext.Provider value={value}>
      {isLoading ? <p>Carregando Lista...</p> : children}
    </ToDoContext.Provider>
  );
};

export function useTodo() {
  const context = useContext(ToDoContext);
  if (context === undefined) {
    throw new Error("useToDo deve ser usado dentro de um StockContextProvider");
  }
  return context;
}
