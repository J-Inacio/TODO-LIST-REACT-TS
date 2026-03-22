import type { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`bg-indigo-600 cursor-pointer text-amber-50 p-1 px-2 rounded-sm hover:bg-indigo-700 ${className ?? ""}`}
    >
      {children}
    </button>
  );
};
