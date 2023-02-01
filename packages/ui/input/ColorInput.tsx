import React from 'react';

import { Input } from '@chakra-ui/react';

import { useTheme } from '@emotion/react';

import { ColorPropsInterface } from './types';

export const ColorInput = ({
  size = 'md',
  color,
  isInvalid = false,
  width,
  value,
  onChange,
}: ColorPropsInterface) => {
  const theme = useTheme();

  return (
    <Input
      type="color"
      width={width}
      variant="outline"
      size={size}
      color={color}
      padding="0"
      backgroundColor={theme.color.transparent}
      borderColor={theme.color.darkGray}
      focusBorderColor="primary.400"
      _placeholder={{ color: 'inherit', opacity: 0.5 }}
      isInvalid={isInvalid}
      value={value}
      onChange={onChange}
    />
  );
};
