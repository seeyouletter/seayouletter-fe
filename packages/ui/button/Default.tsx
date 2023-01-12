import React from 'react';

import { Button } from '@chakra-ui/react';

import { DefaultButtonPropsInterface } from './types';

export function DefaultButton({
  shape = 'solid',
  size = 'md',
  colorScheme = 'primary',
  width,
  height,
  loadingText = '',
  isLoading = false,
  children,
  disabled = false,
  onClick,
  bg,
}: DefaultButtonPropsInterface) {
  return (
    <Button
      size={size}
      colorScheme={colorScheme}
      width={width}
      height={height}
      isLoading={isLoading}
      loadingText={loadingText}
      isDisabled={disabled}
      onClick={onClick}
      variant={shape}
      bg={bg}
    >
      {children}
    </Button>
  );
}
