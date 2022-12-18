import React from 'react';

import Link from 'next/link';

import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link as ChakraLink } from '@chakra-ui/react';

import { LinkInterface } from './types';

export const ExternalLink = ({ href, color = 'primary.500', children }: LinkInterface) => {
  return (
    <ChakraLink as={Link} color={color} href={href} isExternal>
      {children}
      <ExternalLinkIcon mx="2px" />
    </ChakraLink>
  );
};
