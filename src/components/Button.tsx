import type { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="bg-blue-800 cursor-pointer text-amber-50 p-1 px-2 rounded-sm hover:bg-blue-900"
    >
      {children}
    </button>
  );
};
