import React from 'react';

import { IconButton as ChakraIconButton, Spinner } from '@chakra-ui/react';

import { IconButtonPropsInterface } from './types';

export const IconButton = ({
  shape = 'solid',
  ariaLabel,
  icon,
  isLoading,
  disabled,
  isRound = true,
  size = 'md',
  colorScheme = 'primary',
  onClick,
}: IconButtonPropsInterface) => {
  return (
    <ChakraIconButton
      spinner={<Spinner size={'sm'} />}
      icon={icon}
      isLoading={isLoading}
      isDisabled={disabled}
      isRound={isRound}
      variant={shape}
      size={size}
      aria-label={ariaLabel}
      colorScheme={colorScheme}
      onClick={onClick}
    />
  );
};
