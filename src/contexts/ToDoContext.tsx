import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { generateId } from "../utils/generateId";

export interface SubTaskInterface {
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
}

interface ToDoContextType {
  tasks: TaskInterface[];
  addTask: (
    task: Omit<TaskInterface, "taskID" | "createdAt" | "isChecked" | "description" | "subtasks">,
  ) => void;
  removeTask: (id: number) => void;
  updateTask: (id: number, updatedFields: Partial<TaskInterface>) => void;
  isLoading: boolean;
}

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export const ToDoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useLocalStorage<TaskInterface[]>("tarefas-todo", []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const addTask = (
    taskData: Omit<
      TaskInterface,
      "taskID" | "createdAt" | "isChecked" | "description" | "subtasks"
    >,
  ) => {
    const newTask: TaskInterface = {
      ...taskData,
      taskID: generateId(),
      createdAt: new Date().toISOString(),
      isChecked: false,
      description: "",
      subtasks: [],
    };
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const removeTask = (id: number) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.taskID !== id));
  };

  const updateTask = (id: number, updatedFields: Partial<TaskInterface>) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.taskID === id ? { ...task, ...updatedFields } : task)),
    );
  };

  const value = {
    tasks,
    addTask,
    removeTask,
    updateTask,
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
