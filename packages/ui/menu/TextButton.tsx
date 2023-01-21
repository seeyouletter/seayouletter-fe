import React, { PropsWithChildren } from 'react';

import { useTheme } from '@emotion/react';

import { ChevronDownIcon } from '@chakra-ui/icons';

import { IconWithTextButton } from '@ui/button';

interface TextMenuButtonPropsInterface extends PropsWithChildren {
  borderRadius: string;
  color: string;
}
export default function TextMenuButton({
  borderRadius,
  color,
  children,
}: TextMenuButtonPropsInterface) {
  const theme = useTheme();
  return (
    <IconWithTextButton
      fontSize={theme.fontSize.sm}
      shape="ghost"
      borderRadius={borderRadius}
      iconSpacing={1}
      rightIcon={<ChevronDownIcon />}
      colorScheme=""
      color={color}
    >
      {children}
    </IconWithTextButton>
  );
}
