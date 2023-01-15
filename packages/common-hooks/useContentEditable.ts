import { useEffect, useRef, useState } from 'react';

export const useContentEditable = ({ defaultValue = '' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editText, setEditText] = useState(defaultValue);
  const [titleEditable, setTitleEditable] = useState(false);

  const onEdit = () => {
    setTitleEditable(() => true);
  };
  const onCloseEdit = (callback: () => void) => {
    if (titleEditable) {
      setTitleEditable(() => false);
      callback();
    }
  };

  const onInputEditText = (value: string) => {
    setEditText(() => value);
  };

  useEffect(() => {
    if (ref.current === null) return;

    ref.current.textContent = editText;
  }, [editText]);

  return {
    ref,
    editText,
    titleEditable,
    onEdit,
    onCloseEdit,
    onInputEditText,
  };
};
