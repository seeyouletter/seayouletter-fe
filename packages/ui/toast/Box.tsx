import React from 'react';

import { CheckIcon, ExclamantationIcon, XMarkIcon } from '@ui/icon';

import { StyledToast } from './styles';
import { ToastBoxInterface } from './types';

const Icons = {
  error: <XMarkIcon size="14px" />,
  success: <CheckIcon size="16px" />,
  warning: <ExclamantationIcon size="16px" />,
};

export function ToastBox({ type, title, description }: ToastBoxInterface) {
  return (
    <StyledToast.Container type={type}>
      <StyledToast.IconBox>{Icons[type]}</StyledToast.IconBox>
      <StyledToast.CopyBox>
        <StyledToast.Head>{title}</StyledToast.Head>
        <StyledToast.Description>{description}</StyledToast.Description>
      </StyledToast.CopyBox>
    </StyledToast.Container>
  );
}
