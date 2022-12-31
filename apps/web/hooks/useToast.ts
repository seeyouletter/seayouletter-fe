import { toastAtom, toastAtomInterface } from '@atoms/toastAtom';

import { useRef } from 'react';

import { useAtom } from 'jotai';

import { v4 as uuidv4 } from 'uuid';

export const useToastAtom = (delay = 5000) => {
  const [toast, setToast] = useAtom(toastAtom);

  const setTimeoutIdStore = useRef<{ [index: string]: NodeJS.Timeout }>({});

  const clearTimeoutToast = (toastId: string) => {
    if (setTimeoutIdStore.current[toastId]) {
      clearTimeout(setTimeoutIdStore.current[toastId]);
      delete setTimeoutIdStore.current[toastId];
    }
  };

  const removeToast = (toastId: string) => {
    clearTimeoutToast(toastId);

    setToast((state) => {
      return state.filter((t) => t.toastId !== toastId);
    });
  };

  const addToast = (toastItem: toastAtomInterface) => {
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

    setToast((state) => [...state, { ...toastState }]);
  };

  const initializeToast = () => {
    setToast(() => []);
  };

  return {
    toast,
    addToast,
    removeToast,
    initializeToast,
  };
};
