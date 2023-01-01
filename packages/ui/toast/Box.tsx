import { motion } from 'framer-motion';

import React from 'react';

import { CheckIcon, ExclamantationIcon, XMarkIcon } from '@ui/icon';

import { StyledToast } from './styles';
import { ToastBoxInterface } from './types';

const Icons = {
  error: <XMarkIcon size="14px" />,
  success: <CheckIcon size="16px" />,
  warning: <ExclamantationIcon size="16px" />,
};

export const StyledToastContainer = motion(StyledToast.Container);

export function ToastBox({
  transitionDuration = 300,
  type,
  title,
  description,
}: ToastBoxInterface) {
  return (
    <StyledToastContainer
      transition={{ duration: transitionDuration * 0.001 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      type={type}
    >
      <StyledToast.IconBox>{Icons[type]}</StyledToast.IconBox>
      <StyledToast.CopyBox>
        <StyledToast.Head>{title}</StyledToast.Head>
        <StyledToast.Description>{description}</StyledToast.Description>
      </StyledToast.CopyBox>
    </StyledToastContainer>
  );
}
