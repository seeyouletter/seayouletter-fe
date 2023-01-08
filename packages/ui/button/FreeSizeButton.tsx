import React from 'react';

import { Button, ButtonProps } from '@chakra-ui/react';

import { globalTheme } from '@ui/styles';

interface FreeSizeButtonPropsInterface extends ButtonProps {
  hoverBg?: string;
  activeBg?: string;

  hoverColor?: string;
  activeColor?: string;

  border?: string;
  borderRadius: keyof typeof globalTheme.borderRadius;
}
export function FreeSizeButton({
  children,

  width,
  height,

  bg,
  hoverBg = 'primary',
  activeBg = 'primary',

  hoverColor = 'inherit',
  activeColor = 'inherit',

  border = globalTheme.border.default,
  borderRadius = 'soft',

  ...props
}: FreeSizeButtonPropsInterface) {
  return (
    <Button
      width={width}
      height={height}
      bg={bg}
      border={border}
      _hover={{ background: hoverBg, color: hoverColor }}
      _active={{ background: activeBg, color: activeColor }}
      borderRadius={globalTheme.borderRadius[borderRadius]}
      {...props}
    >
      {children}
    </Button>
  );
}
