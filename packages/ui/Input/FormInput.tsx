import React from 'react';

import { Input } from '@chakra-ui/react';

import { InputPropsInterface } from './types';

export const FormInput = ({
  size = 'md',
  shape = 'Flushed',
  placeholder,
  color,
  isInvalid = false,
  ...props
}: InputPropsInterface) => {
  return (
    <Input
      data-testid={props['data-testid']}
      aria-label={props['aria-label']}
      size={size}
      variant={shape}
      color={color}
      placeholder={placeholder}
      _placeholder={{ color: 'inherit', opacity: 0.5 }}
      errorBorderColor="error"
      focusBorderColor="primary.400"
      isInvalid={isInvalid}
    />
  );
};
