import { useEffect, useState } from 'react';

export const useSessionStorage = () => {
  const [sessionStorage, setSessionStorage] = useState<null | Storage>(null);

  useEffect(() => {
    setSessionStorage(() => window.sessionStorage);
  }, []);

  const getItem = <Value>(key: string, defaultValue?: Value) => {
    if (!sessionStorage) return defaultValue;

    try {
      const result = JSON.parse(sessionStorage.getItem(key) as string) ?? defaultValue;
      return result;
    } catch (e) {
      return Error(e as string);
    }
  };

  const setItem = <Value>(key: string, value: Value) => {
    try {
      if (!sessionStorage) return false;

      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  };

  return { getItem, setItem, sessionStorage };
};
