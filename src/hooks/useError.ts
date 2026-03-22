import { useState, useCallback } from "react";
import { useSetTimeout } from "./useSetTimeout";

export const useError = () => {
  const [isError, setIsError] = useState({ errorStatus: false, errorMessage: "" });

  const { startTimer } = useSetTimeout(4, () => {
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
