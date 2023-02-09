import { Menu as ChakraMenu, MenuProps } from '@chakra-ui/react';

export function Menu({ children, ...props }: MenuProps) {
  return <ChakraMenu {...props}>{children}</ChakraMenu>;
}
