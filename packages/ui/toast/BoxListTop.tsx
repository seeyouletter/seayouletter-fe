import { AnimatePresence } from 'framer-motion';

import React from 'react';

import { ToastBox } from './Box';
import { StyledToastBoxList } from './styles';
import { BoxListTopPropsInterface } from './types';

export function ToastBoxListTop({
  transitionDuration = 300,
  containerKey,
  toastList,
  isHeader,
}: BoxListTopPropsInterface) {
  return (
    <StyledToastBoxList.top isHeader={isHeader} key={containerKey}>
      <AnimatePresence>
        {toastList.map(({ toastId, type, description }) => {
          return (
            <ToastBox
              transitionDuration={transitionDuration}
              key={toastId}
              type={type}
              toastId={toastId}
              title={toastId}
              description={description}
            />
          );
        })}
      </AnimatePresence>
    </StyledToastBoxList.top>
  );
}
