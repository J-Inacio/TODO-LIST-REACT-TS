import React, { useState } from "react";
import { useTodo } from "../../contexts/ToDoContext";
import { actionOnKeyDown } from "../../utils/actionOnKeyDown";
import { Button } from "../Button";
import { useError } from "../../hooks/useError";
import { formatDate } from "../../utils/formatDate";
import { motion } from "framer-motion";
import { SubtaskItem } from "./SubtaskItem";
import { Description } from "./Description";

interface DetailsModalProps {
  onClose: () => void;
  id: number | null;
}

export const DetailsModal = ({ onClose, id }: DetailsModalProps) => {
  const { addSubTask, tasks } = useTodo();
  const liveTask = tasks.find((t) => t.taskID === id);
  const [subTaskName, setSubTaskName] = useState("");
  const { isError, showError } = useError();

  const onChangeSubTaskInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSubTaskName(ev.target.value);
  };

  const handleAddSubTask = () => {
    if (!liveTask) return;

    if (subTaskName.trim() === "") {
      showError("Você não pode adicionar uma subtarefa sem um nome");
      return;
    }

    addSubTask(liveTask.taskID, subTaskName);
    setSubTaskName("");
  };

  return (
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
        className="absolute right-0 top-0 w-full md:w-lg h-full bg-amber-50 p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-3xl mb-2 font-bold">{liveTask?.taskName}</h2>
          <div
            className={`${liveTask?.isChecked ? "bg-emerald-600" : "bg-indigo-600"} py-1 px-2 w-fit h-fit rounded-md text-amber-50`}
          >
            {liveTask?.isChecked ? "Concluído" : "Em andamento"}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Description task={liveTask} />
          <h3 className="text-2xl">SubTarefas:</h3>
          <div className="flex w-full gap-2">
            <Button onClick={handleAddSubTask}>+</Button>
            <input
              type="text"
              className="bg-stone-700 text-amber-50 w-full indent-2"
              placeholder="Adicione uma nova subtarefa"
              onChange={onChangeSubTaskInput}
              onKeyDown={(ev) => actionOnKeyDown(ev, "Enter", handleAddSubTask)}
              value={subTaskName}
            />
          </div>
          {isError.errorStatus && <p className="text-red-500">{isError.errorMessage}</p>}
          <div>
            {liveTask?.subtasks?.map((subtask) => {
              return (
                <SubtaskItem subtask={subtask} taskID={liveTask.taskID} key={subtask.subTaskID} />
              );
            })}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Tarefa Criada em: {formatDate(liveTask?.createdAt)}
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-8 bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-700"
        >
          Fechar
        </button>
      </motion.div>
    </motion.div>
  );
};
