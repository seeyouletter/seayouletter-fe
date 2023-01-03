import React from 'react';

import { Button } from '@chakra-ui/react';

import { DefaultButtonPropsInterface } from './types';

export const FullWidthButton = ({
  shape = 'solid',
  size = 'md',
  colorScheme = 'primary',
  height,
  loadingText = '',
  isLoading = false,
  children,
  disabled = false,
  onClick,
  ...props
}: DefaultButtonPropsInterface) => {
  return (
    <Button
      {...props}
      size={size}
      colorScheme={colorScheme}
      width="100%"
      height={height}
      isLoading={isLoading}
      loadingText={loadingText}
      isDisabled={disabled}
      onClick={onClick}
      variant={shape}
    >
      {children}
    </Button>
  );
};
