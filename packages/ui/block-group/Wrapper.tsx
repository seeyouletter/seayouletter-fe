import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { BlockGroupMemberList } from '@ui/block-group/MemberList';
import { DefaultBox } from '@ui/box';
import { DefaultVStack } from '@ui/stack';

import {
  BlockGroupWrapperPropsInterface,
  StyledBlockGroupToggleMarkerInterface,
  StyledBlockGroupToggleTitleInterface,
} from './types';

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

  ${({ actived, theme }) =>
    actived &&
    css`
      font-weight: ${theme.fontWeight.bold};
    `}
`;

export function BlockGroupWrapper({
  id,
  title,
  activeId,
  toggled = true,
  onGroupClick,
  onBlockClick,
  blocks,
}: BlockGroupWrapperPropsInterface) {
  const isActive = activeId === id;

  const theme = useTheme();

  return (
    <DefaultVStack fontSize={theme.fontSize.sm}>
      <DefaultBox
        id={id}
        cursor="pointer"
        backgroundColor={
          isActive ? theme.color.layout.blockGroupToggle.activeBg : theme.color.transparent
        }
        _hover={{
          background: theme.color.layout.blockGroupToggle.activeBg,
        }}
        color={theme.color.white}
        display="flex"
        alignItems="center"
        height="24px"
        position="relative"
        onClick={(e) => onGroupClick(e, '1')}
      >
        <StyledBlockGroupToggleMarker
          toggleMarkerBg={theme.color.white}
          toggleMarkerToggleBg={theme.color.white}
          toggled={toggled}
        />

        <StyledBlockGroupToggleTitle actived={activeId === id}>{title}</StyledBlockGroupToggleTitle>
      </DefaultBox>

      {toggled && (
        <BlockGroupMemberList
          activeId={activeId}
          actived={activeId === id}
          members={blocks}
          onBlockClick={onBlockClick}
          onGroupClick={onGroupClick}
        />
      )}
    </DefaultVStack>
  );
}
