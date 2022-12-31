import { AnimatePresence } from 'framer-motion';

import React from 'react';

import { ToastBox } from './Box';
import { StyledToastBoxList } from './styles';
import { ToastBoxInterface } from './types';

export function ToastBoxListTop({ toastList }: { toastList: ToastBoxInterface[] }) {
  return (
    <StyledToastBoxList.top>
      <AnimatePresence>
        {toastList.map(({ toastId, type, title, description }) => (
          <ToastBox
            type={type}
            key={toastId}
            toastId={toastId}
            title={title}
            description={description}
          />
        ))}
      </AnimatePresence>
    </StyledToastBoxList.top>
  );
}
