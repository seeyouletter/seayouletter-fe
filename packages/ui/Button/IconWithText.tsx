import React from 'react';

import { Button } from '@chakra-ui/react';

import { IconWithTextButtonPropsInterface } from './types';

export const IconWithTextButton = ({
  iconSpacing,
  isLoading,
  disabled,
  leftIcon,
  rightIcon,
  loadingText,
  size = 'md',
  shape = 'solid',
}: IconWithTextButtonPropsInterface) => {
  return (
    <Button
      iconSpacing={iconSpacing}
      isLoading={isLoading}
      isDisabled={disabled}
      spinnerPlacement={leftIcon ? 'start' : 'end'}
      variant={shape}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      size={size}
      loadingText={loadingText}
    >
      IconButton
    </Button>
  );
};
