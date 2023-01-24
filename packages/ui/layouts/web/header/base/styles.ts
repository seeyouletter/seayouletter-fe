import type {} from 'node_modules/@types/react';

import styled from '@emotion/styled';

import { DefaultLink } from '@ui/link';

export const StyledPageLinks = styled.nav`
  display: flex;
  justify-content: space-between;

  width: 540px;

  margin: 0 auto;
`;

export const StyledUserMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  background-color: white;

  border: ${(props) => props.theme.border.default};

  border-radius: 50%;
`;

export const StyledPageLink = styled(DefaultLink)`
  &:hover,
  &:focus,
  &:active {
    font-weight: 700;
  }
  &:active {
    transform: scale(0.98);
  }
`;
