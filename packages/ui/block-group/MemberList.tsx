import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { BlockMembersType } from '@ui/types';

/* eslint-disable-next-line import/no-cycle */
import { MemberFactory } from './Member';
import { BlockGroupWrapperPropsInterface } from './types';

export interface BlockGroupMemberListPropsInterface {
  activeId: BlockGroupWrapperPropsInterface['activeId'];
  hoverId: BlockGroupWrapperPropsInterface['hoverId'];

  depth: number;
  members: BlockMembersType;

  actived: boolean;
  hovered: boolean;

  onBlockClick: BlockGroupWrapperPropsInterface['onBlockClick'];
  onGroupClick: BlockGroupWrapperPropsInterface['onGroupClick'];

  onBlockHover: BlockGroupWrapperPropsInterface['onBlockHover'];

  onUpdateTitle: BlockGroupWrapperPropsInterface['onUpdateTitle'];
}

const StyledBlockGroupMemberList = styled.div<{ parentActived: boolean; parentHovered: boolean }>`
  box-sizing: border-box;

  flex-direction: column;

  font-size: inherit;
  color: white;

  border: ${(props) => props.theme.border.transparent};

  ${({ parentActived, theme }) =>
    parentActived &&
    css`
      background-color: ${theme.color.layout.blockGroupToggle.childrenBg};
    `}
  ${({ parentHovered, theme }) =>
    parentHovered &&
    css`
      border: ${parentHovered ? theme.border.primaryLight : theme.border.transparent};
      border-top: ${theme.border.transparent};
    `}
`;

/**
 * @description
 * 이 컴포넌트가 active되는 시점은 parent GroupWrapper Component가 active되는 시점입니다.
 */
export function BlockGroupMemberList({
  depth,
  activeId,
  actived,
  hoverId,
  hovered,
  members,
  onBlockClick,
  onGroupClick,
  onUpdateTitle,
  onBlockHover,
}: BlockGroupMemberListPropsInterface) {
  return (
    <StyledBlockGroupMemberList parentActived={actived} parentHovered={hovered}>
      {members.map((member, index) => (
        <MemberFactory
          depth={depth}
          order={index}
          key={member.id}
          member={member}
          activeId={activeId}
          hoverId={hoverId}
          onGroupClick={onGroupClick}
          onBlockClick={onBlockClick}
          onBlockHover={onBlockHover}
          onUpdateTitle={onUpdateTitle}
        />
      ))}
    </StyledBlockGroupMemberList>
  );
}
