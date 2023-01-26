import { useEffect, useRef, useState } from 'react';

import { useAtom } from 'jotai';

import { v4 as uuidv4 } from 'uuid';

import { toastAtom, toastAtomInterface } from '@atoms/toastAtom';

export const useToast = ({ duration = 2000, transitionDuration = 300 }) => {
  const [toastList, setToastList] = useAtom(toastAtom);

  const [toastContainerKey, setToastContainerKey] = useState('disabled');

  useEffect(() => {
    if (toastList.length) {
      setToastContainerKey('hasToastList');
    } else {
      setTimeout(() => {
        if (toastList.length) return;
        setToastContainerKey('notHasToastList');
      }, transitionDuration);
    }
  }, [toastList, transitionDuration]);

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
    }, duration);

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
    toastContainerKey,
    addToast,
    removeToast,
    initializeToast,
  };
};
