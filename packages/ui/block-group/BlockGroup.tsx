import React, { MouseEvent, PropsWithChildren } from 'react';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { DefaultBox } from '@ui/box';
import { DefaultVStack } from '@ui/stack';

interface CommonStyledBlockInterface {
  actived?: boolean;
}

interface CommonBlockPropsInterface {
  id: string;
  activeId?: string | null;
  onClick: (e: MouseEvent, id: string) => void;
}

interface StyledBlockGroupToggleTitleInterface {
  toggleColor?: string;
}

export interface StyledBlockGroupToggleMarkerInterface extends CommonStyledBlockInterface {
  toggleMarkerBg?: string;
  toggleMarkerToggleBg?: string;
  toggled?: boolean;
}

export interface BlockGroupTogglePropsInterface
  extends Omit<StyledBlockGroupToggleMarkerInterface, 'actived'>,
    StyledBlockGroupToggleTitleInterface,
    CommonBlockPropsInterface {
  color?: string;
  hoverBg?: string;
}

export interface BlockPropsInterface extends CommonBlockPropsInterface, PropsWithChildren {}

const StyledBlockGroupToggleMarker = styled.div<StyledBlockGroupToggleMarkerInterface>`
  position: absolute;

  margin-left: 8px;

  border-top: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid ${({ toggleMarkerBg }) => toggleMarkerBg};

  transition: all 0.3s;

  ${({ toggled, toggleMarkerToggleBg }) =>
    toggled &&
    css`
      border-left: 6px solid ${toggleMarkerToggleBg};
      transform: rotate(90deg);
      transform-origin: 25% 50%;
    `}
`;

const StyledBlockGroupToggleTitle = styled.div<StyledBlockGroupToggleTitleInterface>`
  width: 100%;
  margin-left: 20px;
  font-size: ${(props) => props.theme.fontSize.sm};
`;

const StyledBlockGroupMember = styled.div<{ toggled: boolean; parentActived: boolean }>`
  display: ${({ toggled }) => (toggled ? 'flex' : 'none')};
  flex-direction: column;
  padding-left: 20px;
  font-size: inherit;
  color: white;

  ${({ parentActived, theme }) =>
    parentActived &&
    css`
      background-color: ${theme.color.layout.blockGroupToggle.childrenBg};
    `}
`;

const StyledBlockContainer = styled.div<CommonStyledBlockInterface>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
`;

const Block = ({ id, children, onClick, activeId }: BlockPropsInterface) => {
  return (
    <StyledBlockContainer onClick={(e) => onClick(e, id)} actived={activeId === id}>
      {children}
    </StyledBlockContainer>
  );
};

export function BlockGroupWrapper({
  id,
  activeId,
  toggled = true,
  color,
  hoverBg,
  toggleMarkerBg,
  toggleMarkerToggleBg,
  toggleColor,
  onClick,
}: BlockGroupTogglePropsInterface) {
  const isActive = activeId === id;

  const theme = useTheme();

  return (
    <DefaultVStack fontSize={theme.fontSize.sm}>
      <DefaultBox
        id="1"
        cursor="pointer"
        backgroundColor={
          isActive ? theme.color.layout.blockGroupToggle.activeBg : theme.color.transparent
        }
        _hover={{
          background: hoverBg ?? theme.color.layout.blockGroupToggle.activeBg,
        }}
        color={toggled ? color ?? theme.color.white : toggleColor ?? theme.color.white}
        display="flex"
        alignItems="center"
        height="24px"
        position="relative"
        onClick={(e) => onClick(e, '1')}
      >
        <StyledBlockGroupToggleMarker
          toggleMarkerBg={toggleMarkerBg ?? theme.color.white}
          toggleMarkerToggleBg={toggleMarkerToggleBg ?? toggleColor ?? theme.color.white}
          toggled={toggled}
        />
        <StyledBlockGroupToggleTitle>안뇽하세용...</StyledBlockGroupToggleTitle>
      </DefaultBox>

      <StyledBlockGroupMember toggled={toggled} parentActived={activeId === id}>
        <Block id="2" onClick={onClick}>
          블록이라능
        </Block>
        <Block id="3" onClick={onClick}>
          블록2이라능
        </Block>
        <Block id="4" onClick={onClick}>
          블록3이라능
        </Block>
      </StyledBlockGroupMember>
    </DefaultVStack>
  );
}
