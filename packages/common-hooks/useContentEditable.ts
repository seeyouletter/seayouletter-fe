import { FormEvent, useState } from 'react';

export const useContentEditable = ({ defaultValue = '' }) => {
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

  const onInputEditText = (e: FormEvent) => {
    setEditText(() => (e.target as HTMLInputElement).value);
  };

  return {
    editText,
    titleEditable,
    onEdit,
    onCloseEdit,
    onInputEditText,
  };
};
