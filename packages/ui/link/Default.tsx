import React from 'react';

import Link from 'next/link';

import { Link as ChakraLink } from '@chakra-ui/react';

import { css } from '@emotion/react';

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

const boldCSS = (bold: boolean) => css`
  ${bold &&
  css`
    font-weight: 700;
  `}
`;

export const DefaultLink = ({
  href,
  className,
  color = 'text',
  activeColor = 'text',
  children,
  noUnderline = false,
  bold = false,
  ...props
}: LinkInterface) => {
  const activeStyle = {
    color: activeColor,
    textDecoration: noUnderline ? 'none' : 'underline',
    textDecorationColor: 'current',
  };

  return (
    <ChakraLink
      {...props}
      className={'link ' + className}
      css={[activeLinkWithNoUnderlineCSS(noUnderline), boldCSS(bold)]}
      as={Link}
      color={color}
      href={href}
      _hover={activeStyle}
      _active={activeStyle}
      _focus={activeStyle}
      textDecorationColor="currentcolor"
    >
      {children}
    </ChakraLink>
  );
};
