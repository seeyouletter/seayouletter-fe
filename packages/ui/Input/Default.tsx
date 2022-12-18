import React from 'react';

import { Input } from '@chakra-ui/react';

import { InputPropsInterface } from './types';

export const DefaultInput = ({
  size = 'md',
  color,
  placeholder = '',
  isInvalid = false,
}: InputPropsInterface) => {
  return (
    <Input
      variant={'outline'}
      size={size}
      color={color}
      placeholder={placeholder}
      errorBorderColor="error"
      focusBorderColor="primary.400"
      _placeholder={{ color: 'inherit', opacity: 0.5 }}
      isInvalid={isInvalid}
    ></Input>
  );
};
