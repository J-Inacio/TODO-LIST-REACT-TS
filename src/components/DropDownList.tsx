import type React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface DropDownListProps {
  listName: "Todas tarefas" | "Em andamento" | "Concluídas";
  children: React.ReactNode;
}

const listColor: Record<DropDownListProps["listName"], string> = {
  "Todas tarefas": "bg-indigo-600",
  "Em andamento": "bg-blue-600",
  Concluídas: "bg-emerald-600",
};

export const DropDownList = ({ children, listName }: DropDownListProps) => {
  const [isOpen, setIsOpen] = useState(listName === "Em andamento" ? true : false);
  return (
    <>
      <AnimatePresence initial={false}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex cursor-pointer items-center ${listColor[listName]} gap-1 py-1 px-2 w-fit h-fit rounded-md text-amber-50`}
        >
          <motion.i
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-4 h-4 flex items-center justify-center"
          >
            <ChevronRightIcon />
          </motion.i>
          <p>{listName}</p>
        </button>

        {isOpen && (
          <motion.ul
            key={`dropdown-content-${listName}`}
            className="overflow-hidden"
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
