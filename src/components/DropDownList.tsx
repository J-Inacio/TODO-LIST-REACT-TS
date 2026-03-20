import type React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface DropDownListProps {
  listName: "Todas tarefas" | "Em andamento" | "Concluídas";
  setIsOpen: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

const listColor: Record<DropDownListProps["listName"], string> = {
  "Todas tarefas": "bg-indigo-600",
  "Em andamento": "bg-emerald-600",
  Concluídas: "bg-blue-600",
};

export const DropDownList = ({ isOpen, setIsOpen, children, listName }: DropDownListProps) => {
  return (
    <>
      <button
        type="button"
        onClick={setIsOpen}
        className={`flex cursor-pointer items-center ${listColor[listName]} gap-1 py-1 px-2 w-fit h-fit rounded-md text-amber-50`}
      >
        <i className="w-4 h-h-auto ">{isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}</i>
        <p>{listName}</p>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            className={isOpen ? "" : "hidden"}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};
