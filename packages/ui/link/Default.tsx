import React from 'react';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Link as ChakraLink } from '@chakra-ui/react';

import { LinkInterface } from './types';

const activeLinkWithNoUnderlineCSS = (noUnderline: boolean) => css`
  ${noUnderline &&
  css`
    text-decoration: none;

    &:focus,
    &:hover,
    &:active {
      text-decoration: none;
    }
  `}
`;

export const DefaultLink = ({
  href,
  className,
  color = 'text',
  activeColor = 'text',
  children,
  noUnderline = false,
}: LinkInterface) => {
  const activeStyle = { color: activeColor, textDecoration: noUnderline ? 'none' : 'underline' };
  return (
    <ChakraLink
      css={activeLinkWithNoUnderlineCSS(noUnderline)}
      as={Link}
      color={color}
      href={href}
      className={className}
      _hover={activeStyle}
      _active={activeStyle}
      _focus={activeStyle}
    >
      {children}
    </ChakraLink>
  );
};
