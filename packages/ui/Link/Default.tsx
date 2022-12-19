import React from 'react';

import Link from 'next/link';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Link as ChakraLink } from '@chakra-ui/react';

import { LinkInterface } from './types';

const activeLinkWithNoUnderlineCSS = (color: string) => css`
  &.link {
    text-decoration: none;

    &:focus,
    &:hover,
    &:active {
      color: ${color};
      text-decoration: none;
    }
  }
`;

const StyledLink = styled(Link)`
  ${({ theme }) => activeLinkWithNoUnderlineCSS(theme.color.primary[500])}
`;

export const DefaultLink = ({
  href,
  className,
  color = 'primary.500',
  children,
  noUnderline = true,
}: LinkInterface) => {
  return (
    <ChakraLink
      as={StyledLink}
      color={color}
      href={href}
      className={noUnderline ? 'link' : '' + className}
    >
      {children}
    </ChakraLink>
  );
};
