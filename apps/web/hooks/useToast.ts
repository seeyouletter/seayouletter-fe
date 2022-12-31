import { toastAtom, toastAtomInterface } from '@atoms/toastAtom';

import { useRef } from 'react';

import { useAtom } from 'jotai';

import { v4 as uuidv4 } from 'uuid';

export const useToastAtom = (delay = 2000) => {
  const [toastList, setToastList] = useAtom(toastAtom);

  const setTimeoutIdStore = useRef<{ [index: string]: NodeJS.Timeout }>({});

  const clearTimeoutToast = (toastId: string) => {
    if (setTimeoutIdStore.current[toastId]) {
      clearTimeout(setTimeoutIdStore.current[toastId]);
      delete setTimeoutIdStore.current[toastId];
    }
  };

  const removeToast = (toastId: string) => {
    clearTimeoutToast(toastId);

    setToastList((state) => {
      return state.filter((t) => t.toastId !== toastId);
    });
  };

  const addToast = (toastItem: Omit<toastAtomInterface, 'toastId'>) => {
    const toastId = uuidv4();

    const clearToastId = setTimeout(() => {
      clearTimeoutToast(toastId);
      removeToast(toastId);
    }, delay);

    setTimeoutIdStore.current[toastId] = clearToastId;

    const toastState = {
      ...toastItem,
      toastId,
    };

    setToastList((state) => [...state, { ...toastState }]);
  };

  const initializeToast = () => {
    setToastList(() => []);
  };

  return {
    toastList,
    addToast,
    removeToast,
    initializeToast,
  };
};
