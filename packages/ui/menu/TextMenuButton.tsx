import React, { PropsWithChildren } from 'react';

import { ChevronDownIcon } from '@chakra-ui/icons';

import { useTheme } from '@emotion/react';

import { IconWithTextButton } from '@ui/button';

interface TextMenuButtonPropsInterface extends PropsWithChildren {
  borderRadius: string;
  color: string;
}
export function TextMenuButton({ borderRadius, color, children }: TextMenuButtonPropsInterface) {
  const theme = useTheme();
  return (
    <IconWithTextButton
      padding="12px"
      fontSize={theme.fontSize.xs}
      shape="ghost"
      borderRadius={borderRadius}
      iconSpacing={1}
      rightIcon={<ChevronDownIcon />}
      colorScheme=""
      color={color}
      _hover={{
        backgroundColor: theme.color.primary[500],
      }}
    >
      {children}
    </IconWithTextButton>
  );
}
