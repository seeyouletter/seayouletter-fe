import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import { MenuButton } from '@chakra-ui/react';

const StyledMenuButton = styled(MenuButton)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  padding: 0;

  overflow: hidden;
  border-radius: 50%;

  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;

  &:after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    content: '';
    border-radius: 50%;
    transition: all 0.2s;
  }

  &:hover:after {
    background: rgba(0, 0, 0, 0.25);
  }
`;

export function MenuIconButton({ children }: PropsWithChildren) {
  return <StyledMenuButton>{children}</StyledMenuButton>;
}
