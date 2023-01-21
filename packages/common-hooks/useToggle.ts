import { useEffect, useRef, useState } from 'react';

export const useToggle = (cb?: () => unknown) => {
  const [isActive, setActive] = useState(false);
  const callbackRef = useRef<(() => unknown) | null>(null);

  useEffect(() => {
    if (!callbackRef || !cb) return;

    callbackRef.current = cb;
  }, [cb]);

  const onToggle = () => {
    setActive((state) => !state);

    if (callbackRef.current) {
      callbackRef.current();
    }
  };

  return {
    isActive,
    onToggle,
  };
};
