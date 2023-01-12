import { useRef, useState } from 'react';

interface UseModalPropsInterface {
  confirmCallback: () => void;
  cancelCallback?: () => void;
}
export const useModal = ({ confirmCallback, cancelCallback }: UseModalPropsInterface) => {
  const [visible, setVisible] = useState(true);

  const confirmCallbackRef = useRef(confirmCallback);
  const cancelCallbackRef = useRef(cancelCallback);

  const onOpenModal = () => {
    setVisible(() => true);
  };

  const onCloseModal = () => {
    setVisible(() => false);
  };

  const onConfirmButtonClick = () => {
    confirmCallbackRef.current();
    setVisible(() => false);
  };

  const onCancelButtonClick = () => {
    if (!cancelCallbackRef.current) {
      return;
    }

    cancelCallbackRef.current();
    setVisible(() => false);
  };

  return {
    visible,
    onOpenModal,
    onCloseModal,
    onConfirmButtonClick,
    onCancelButtonClick,
  };
};
