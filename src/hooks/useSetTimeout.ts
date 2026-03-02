import { useRef, useEffect } from "react";

export const useSetTimeout = (expireSeconds: number, callbackFunction: () => void) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expireTime = expireSeconds * 1000;
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const startTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callbackFunction();
    }, expireTime);
  };

  return { startTimer };
};
