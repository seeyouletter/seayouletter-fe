import React from 'react';

import { Button, VStack } from '@chakra-ui/react';

import { DefaultButtonPropsInterface } from './types';

export const DefaultButton = ({
  size = 'md',
  colorScheme,
  height,
  loadingText = '',
  isLoading = false,
  children,
  disabled = false,
}: DefaultButtonPropsInterface) => {
  return (
    <Button
      size={size}
      colorScheme={colorScheme}
      width="100%"
      height={height}
      isLoading={isLoading}
      loadingText={loadingText}
      isDisabled={disabled}
    >
      {children}
      <VStack>wefewwe</VStack>
    </Button>
  );
};
