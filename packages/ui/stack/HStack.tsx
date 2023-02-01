import React from 'react';

import { HStack } from '@chakra-ui/react';

import { DefaultHStackInterface } from './types';

/**
 * @params { inline: StakcsProps['isInline'] } & Omit<StackProps, 'inline'>
 * @description inline이라는 용어가 주는 직관적인 느낌이 더 좋아서 바꾸었습니다.
 */
export const DefaultHStack = ({
  as,
  className,

  children,
  direction,

  justify,
  align,
  wrap,

  inline = false,
  shouldWrapChildren = false,

  spacing = '0px',
  divider,
  ...props
}: DefaultHStackInterface) => {
  return (
    <HStack
      as={as}
      className={className}
      align={align}
      direction={direction}
      isInline={inline}
      justify={justify}
      shouldWrapChildren={shouldWrapChildren}
      spacing={spacing}
      wrap={wrap}
      divider={divider}
      {...props}
    >
      {children}
    </HStack>
  );
};
