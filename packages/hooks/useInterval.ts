import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<typeof callback>(callback);
  const timerId = useRef<undefined | null | NodeJS.Timeout>();

  const resetInterval = () => {
    const tick = () => {
      savedCallback.current();
    };

    if (timerId.current) {
      clearTimeout(timerId.current as NodeJS.Timeout);
    }

    timerId.current = setInterval(tick, delay);
  };

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    timerId.current = setInterval(tick, delay);

    return () => clearInterval(timerId.current as NodeJS.Timeout);
  }, [delay, savedCallback, timerId]);

  return { timerId, savedCallback, resetInterval };
};
