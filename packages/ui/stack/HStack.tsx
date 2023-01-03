import React from 'react';

import { HStack, StackProps } from '@chakra-ui/react';

export interface DefaultHStackInterface extends Omit<StackProps, 'inline'> {
  inline?: StackProps['isInline'];
}

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
  marginTop,
  marginBottom,
  divider,
  ...props
}: DefaultHStackInterface) => {
  return (
    <HStack
      {...props}
      as={as}
      className={className}
      align={align}
      direction={direction}
      isInline={inline}
      justify={justify}
      shouldWrapChildren={shouldWrapChildren}
      marginTop={marginTop}
      marginBottom={marginBottom}
      spacing={spacing}
      wrap={wrap}
      divider={divider}
    >
      {children}
    </HStack>
  );
};
