import { useEffect, useState } from 'react';

interface UseFormParamsInterface<T> {
  initialState: T;
}

export const useForm = <T>({ initialState }: UseFormParamsInterface<T>) => {
  const [formState, setFormState] = useState(initialState);

  const updateFormState = (
    key: keyof typeof initialState,
    value: (typeof initialState)[typeof key]
  ) => {
    setFormState((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const initializeFormState = (key?: keyof typeof formState) => {
    if (key) {
      setFormState((state) => ({
        ...state,
        [key]: '',
      }));
    } else {
      setFormState(() => initialState);
    }
  };

  useEffect(() => {
    initializeFormState();

    return () => {
      initializeFormState();
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return {
    formState,
    updateFormState,
    initializeFormState,
  };
};
