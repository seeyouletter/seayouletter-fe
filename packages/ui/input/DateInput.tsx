import React from 'react';

import { Input } from '@chakra-ui/react';

import { InputPropsInterface } from './types';

export const DateInput = ({
  shape = 'flushed',
  size = 'md',
  placeholder,
  color,
  isInvalid = false,
}: InputPropsInterface) => {
  return (
    <Input
      variant={shape}
      size={size}
      color={color}
      placeholder={placeholder}
      _placeholder={{ color: 'inherit', opacity: 0.5 }}
      type="date"
      errorBorderColor="error"
      isInvalid={isInvalid}
    />
  );
};
