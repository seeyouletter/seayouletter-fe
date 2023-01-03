import { StackProps, VStack } from '@chakra-ui/react';

interface DefaultHStackInterface extends Omit<StackProps, 'inline'> {
  inline?: StackProps['isInline'];
}

/**
 * @params { inline: StakcsProps['isInline'] } & Omit<StackProps, 'inline'>
 * @description inline이라는 용어가 주는 직관적인 느낌이 더 좋아서 바꾸었습니다.
 */
export const DefaultVStack = ({
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
    <VStack
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
    </VStack>
  );
};
