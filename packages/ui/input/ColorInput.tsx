import React from 'react';

import { useTheme } from '@emotion/react';

import { Input } from '@chakra-ui/react';

import { ColorPropsInterface } from './types';

export const ColorInput = ({
  size = 'md',
  color,
  isInvalid = false,
  width,
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
      borderColor={theme.color.transparent}
      focusBorderColor="primary.400"
      _placeholder={{ color: 'inherit', opacity: 0.5 }}
      isInvalid={isInvalid}
    />
  );
};
