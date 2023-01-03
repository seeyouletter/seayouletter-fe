import React from 'react';

import { Icon as ChakraIcon } from '@chakra-ui/react';

import { DefaultIconInterface } from './types';

export const Icon = ({ children, viewBox, width, height }: DefaultIconInterface) => {
  return (
    <ChakraIcon viewBox={viewBox} width={width} height={height}>
      {children}
    </ChakraIcon>
  );
};
