import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

export function DefaultBox({ children, ...props }: BoxProps) {
  return <Box {...props}>{children}</Box>;
}
