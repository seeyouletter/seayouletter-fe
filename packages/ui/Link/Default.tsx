import React from 'react';

import Link from 'next/link';

import { Link as ChakraLink } from '@chakra-ui/react';

import { LinkInterface } from './types';

export const DefaultLink = ({ href, color = 'primary.500', children }: LinkInterface) => {
  return (
    <ChakraLink as={Link} color={color} href={href}>
      {children}
    </ChakraLink>
  );
};
