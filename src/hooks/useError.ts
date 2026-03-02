import { useState, useCallback } from "react";
import { useSetTimeout } from "./useSetTimeout"; // Importamos o cronômetro

export const useError = () => {
  const [isError, setIsError] = useState({ errorStatus: false, errorMessage: "" });

  const { startTimer } = useSetTimeout(3, () => {
    setIsError({ errorStatus: false, errorMessage: "" });
  });

  const showError = useCallback(
    (message: string) => {
      setIsError({ errorStatus: true, errorMessage: message });

      startTimer();
    },
    [startTimer],
  );

  return { isError, showError };
};
