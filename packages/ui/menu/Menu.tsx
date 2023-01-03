import React from 'react';

import { Menu as ChakraMenu } from '@chakra-ui/react';

export function Menu({ children }: React.PropsWithChildren) {
  return <ChakraMenu>{children}</ChakraMenu>;
}
