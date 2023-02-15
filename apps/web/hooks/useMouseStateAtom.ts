import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { mouseStateAtom } from '@atoms/index';

import { throttle } from '@utils/throttle';

export const useMouseStateAtom = () => {
  const [mouseState, setMouseState] = useAtom(mouseStateAtom);

  const activeMouseMove = (x: number, y: number) => {
    setMouseState(() => ({
      moveActived: true,
      x,
      y,
    }));
  };

  const inactiveMouseMove = () => {
    setMouseState(() => ({
      moveActived: false,
      x: 0,
      y: 0,
    }));
  };

  useEffect(() => {
    const mouseMoveHandler = throttle((e: MouseEvent) => {
      const { clientX, clientY } = e;

      setMouseState((state) => ({
        ...state,
        x: clientX,
        y: clientY,
      }));
    }, 20);

    if (mouseState.moveActived) {
      document.body.addEventListener('mousemove', mouseMoveHandler);
    }

    return () => {
      document.body.removeEventListener('mousemove', mouseMoveHandler);
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [mouseState.moveActived]);

  return { mouseState, activeMouseMove, inactiveMouseMove };
};
