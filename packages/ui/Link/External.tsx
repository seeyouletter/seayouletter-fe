import React from 'react';

import Link from 'next/link';

import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link as ChakraLink } from '@chakra-ui/react';

import { LinkInterface } from './types';

export const ExternalLink = ({
  className,
  href,
  color = 'primary.500',
  children,
}: LinkInterface) => {
  return (
    <ChakraLink as={Link} className={className} color={color} href={href} isExternal>
      {children}
      <ExternalLinkIcon mx="4px" fontSize="12px" />
    </ChakraLink>
  );
};
