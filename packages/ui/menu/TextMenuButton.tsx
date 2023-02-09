import React from 'react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { MenuButton, MenuButtonProps } from '@chakra-ui/react';

import styled from '@emotion/styled';

import { globalTheme } from '@ui/styles';

interface TextMenuButtonPropsInterface extends MenuButtonProps {
  hoverBg?: MenuButtonProps['bg'];
  activeBg?: MenuButtonProps['bg'];
}

const StyledMenuButton = styled((props: MenuButtonProps) => <MenuButton {...props} />)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 12px;

  overflow: hidden;
  font-size: ${(props) => props.theme.fontSize.xs};
  color: ${(props) => props.color};
  border: none;

  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.25);
  box-shadow: none;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.color.primary[500]};
  }
`;

export function TextMenuButton({
  bg = globalTheme.color.transparent,
  hoverBg = globalTheme.color.primary[500],
  activeBg = globalTheme.color.primary[500],
  borderRadius = '0',
  color = globalTheme.color.text,
  children,
}: TextMenuButtonPropsInterface) {
  return (
    <StyledMenuButton
      bg={bg}
      _hover={{
        bg: hoverBg,
      }}
      _active={{
        bg: activeBg,
      }}
      borderRadius={borderRadius}
      color={color}
    >
      {children}
      <ChevronDownIcon marginLeft="4px" />
    </StyledMenuButton>
  );
}
