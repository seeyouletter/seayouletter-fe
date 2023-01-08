import React from 'react';

import { Input } from '@chakra-ui/react';

import { InputPropsInterface } from './types';

export const DefaultInput = ({
  size = 'md',
  color,
  placeholder = '',
  isInvalid = false,
  borderColor = 'sub.500',
}: InputPropsInterface) => {
  return (
    <Input
      variant="outline"
      size={size}
      color={color}
      placeholder={placeholder}
      borderColor={borderColor}
      errorBorderColor="error"
      focusBorderColor="primary.400"
      _placeholder={{ color: 'inherit', opacity: 0.5 }}
      isInvalid={isInvalid}
      background="white"
      opacity={0.9}
    ></Input>
  );
};
