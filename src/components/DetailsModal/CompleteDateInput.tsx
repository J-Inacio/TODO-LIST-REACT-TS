import { isValid, parse, startOfDay, isBefore } from "date-fns";
import { actionOnKeyDown } from "../../utils/actionOnKeyDown";
import { useTodo, type TaskInterface } from "../../contexts/ToDoContext";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

interface CompleteDateInputProps {
  task: TaskInterface | undefined;
  value: string | null;
  onChange: (date: string) => void;
}

export const CompleteDateInput = ({ task, value, onChange }: CompleteDateInputProps) => {
  const { updateTask } = useTodo();

  const handleAddCompleteDate = () => {
    if (!value || !task) return;
    const parsedDate = parse(value, "dd/MM/yyyy", new Date());

    if (!isValid(parsedDate)) {
      console.error("Data inválida no calendário!");
      return;
    }

    const now = startOfDay(new Date());
    const selectedDate = startOfDay(parsedDate);

    if (isBefore(selectedDate, now)) {
      console.error("Erro: A data escolhida já passou!");
      return;
    }

    updateTask(task.taskID, { completeDate: parsedDate.toISOString() });
  };

  const handleDateMask = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/\D/g, "");

    if (inputValue.length >= 2) {
      let day = parseInt(inputValue.substring(0, 2));
      if (day > 31) day = 31;
      inputValue = day.toString().padStart(2, "0") + inputValue.substring(2);
    }

    if (inputValue.length >= 4) {
      let month = parseInt(inputValue.substring(2, 4));
      if (month > 12) month = 12;
      inputValue =
        inputValue.substring(0, 2) + month.toString().padStart(2, "0") + inputValue.substring(4);
    }

    inputValue = inputValue.replace(/(\d{2})(\d)/, "$1/$2");
    inputValue = inputValue.replace(/(\d{2})(\d)/, "$1/$2");

    inputValue = inputValue.slice(0, 10);

    onChange(inputValue);
  };

  return (
    <div className="mt-1 flex gap-1">
      <CalendarDaysIcon className="h-full w-10 text-stone-700" />
      <input
        placeholder="Ex: dd/mm/yyyy"
        name="date"
        id="date"
        type="text"
        value={value ?? ""}
        onChange={handleDateMask}
        onKeyDown={(ev) => actionOnKeyDown(ev, "Enter", handleAddCompleteDate)}
        className="relative flex h-10 w-full items-center justify-center rounded-lg bg-white indent-5 transition-all duration-200 focus-within:ring-2 focus-within:ring-indigo-600 hover:ring-2 hover:ring-indigo-400 focus:border-transparent focus:outline-0"
      />
    </div>
  );
};
