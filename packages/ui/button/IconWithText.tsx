import React from 'react';

import { Button } from '@chakra-ui/react';

import { IconWithTextButtonPropsInterface } from './types';

export const IconWithTextButton = ({
  shape = 'solid',
  colorScheme,
  iconSpacing,
  isLoading,
  disabled,
  leftIcon,
  rightIcon,
  loadingText,
  size = 'md',
  onClick,
  children,
}: IconWithTextButtonPropsInterface) => {
  return (
    <Button
      colorScheme={colorScheme}
      iconSpacing={iconSpacing}
      isLoading={isLoading}
      isDisabled={disabled}
      spinnerPlacement={leftIcon ? 'start' : 'end'}
      variant={shape}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      size={size}
      loadingText={loadingText}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
