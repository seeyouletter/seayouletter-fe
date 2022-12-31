import React from 'react';

import { CheckIcon, ExclamantationIcon, XMarkIcon } from '@ui/icon';

import { StyledToast } from './styles';
import { ToastBoxInterface } from './types';

const Icons = {
  error: <XMarkIcon size="14px" />,
  success: <CheckIcon size="16px" />,
  warning: <ExclamantationIcon size="16px" />,
};

export function ToastBox({ toastId, type, title, description }: ToastBoxInterface) {
  return (
    <StyledToast.Container
      key={toastId}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, translateY: '0px' }}
      exit={{ opacity: 0, scale: 0.5 }}
      type={type}
    >
      <StyledToast.IconBox>{Icons[type]}</StyledToast.IconBox>
      <StyledToast.CopyBox>
        <StyledToast.Head>{title}</StyledToast.Head>
        <StyledToast.Description>{description}</StyledToast.Description>
      </StyledToast.CopyBox>
    </StyledToast.Container>
  );
}
