import Link from 'next/link';

import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link as ChakraLink } from '@chakra-ui/react';

import { LinkInterface } from './types';

export const ExternalLink = ({
  className,
  href,
  color = 'text',
  activeColor = 'text',
  noUnderline = false,
  children,
}: LinkInterface) => {
  const activeStyle = { color: activeColor, textDecoration: noUnderline ? 'none' : 'underline' };
  return (
    <ChakraLink
      as={Link}
      className={className}
      color={color}
      href={href}
      isExternal
      _hover={activeStyle}
      _focus={activeStyle}
      _active={activeStyle}
    >
      {children}
      <ExternalLinkIcon mx="4px" fontSize="12px" />
    </ChakraLink>
  );
};
