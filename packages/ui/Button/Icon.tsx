import React from 'react';

import { IconButton as ChakraIconButton } from '@chakra-ui/react';

import { IconButtonPropsInterface } from './types';

export const IconButton = ({
  ariaLabel,
  icon,
  isLoading,
  disabled,
  isRound = true,
  size = 'md',
  shape = 'solid',
  colorScheme = 'primary',
}: IconButtonPropsInterface) => {
  return (
    <ChakraIconButton
      icon={icon}
      isLoading={isLoading}
      isDisabled={disabled}
      isRound={isRound}
      variant={shape}
      size={size}
      aria-label={ariaLabel}
      colorScheme={colorScheme}
    />
  );
};
