import React from 'react';

import { Input } from '@chakra-ui/react';

import { InputPropsInterface } from './types';

export const DefaultInput = ({
  size = 'md',
  color,
  placeholder = '',
  isInvalid = false,
  borderColor = 'sub.500',
  width,
  bgColor,
  padding,
  value,
  onChange,
  onInput,
  onBlur,
}: InputPropsInterface) => {
  return (
    <Input
      width={width}
      variant="outline"
      size={size}
      color={color}
      backgroundColor={bgColor}
      placeholder={placeholder}
      borderColor={borderColor}
      errorBorderColor="error"
      focusBorderColor="primary.400"
      _placeholder={{ color: 'inherit', opacity: 0.5 }}
      isInvalid={isInvalid}
      background="white"
      opacity={0.9}
      padding={padding}
      value={value}
      onChange={onChange}
      onInput={onInput}
      onBlur={onBlur}
    />
  );
};
