import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { MouseStateAtomInterface, mouseStateAtom } from '@atoms/index';

import { throttle } from '@utils/index';

export const useMouseStateAtom = () => {
  const [mouseState, setMouseState] = useAtom(mouseStateAtom);

  const activeMouseMove = (
    x: number,
    y: number,
    options: Pick<MouseStateAtomInterface, 'throttle'>
  ) => {
    setMouseState((state) => ({
      ...state,
      moveActived: true,
      x,
      y,
      ...options,
    }));
  };

  const inactiveMouseMove = () => {
    setMouseState((state) => ({
      ...state,
      moveActived: false,
      x: 0,
      y: 0,
    }));
  };

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      setMouseState((state) => ({
        ...state,
        x: clientX,
        y: clientY,
      }));
    };

    if (mouseState.moveActived) {
      document.body.addEventListener(
        'mousemove',
        mouseState.throttle ? throttle(mouseMoveHandler, 10) : mouseMoveHandler,
        { passive: true }
      );
    }

    return () => {
      document.body.removeEventListener('mousemove', mouseMoveHandler);
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [mouseState.moveActived]);

  return { mouseState, activeMouseMove, inactiveMouseMove };
};
