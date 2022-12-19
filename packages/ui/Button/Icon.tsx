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
  bg,
  hoverBg = 'primary.200',
  activeBg = 'primary.500',
  colorScheme = 'primary',
  isBoxShadow = false,
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
      bg={bg}
      _hover={{
        bg: hoverBg,
      }}
      _active={{
        bg: activeBg,
      }}
      boxShadow={isBoxShadow ? '0px 2px 2px 1px rgba(0,0,0,0.25)' : undefined}
    />
  );
};
