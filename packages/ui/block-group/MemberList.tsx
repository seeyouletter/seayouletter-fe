import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { BlockMembersType } from '@ui/types';

/* eslint-disable-next-line import/no-cycle */
import { MemberFactory } from './Member';
import { BlockGroupWrapperPropsInterface } from './types';

export interface BlockGroupMemberListPropsInterface {
  activeId: BlockGroupWrapperPropsInterface['activeId'];
  depth: number;
  members: BlockMembersType;
  actived: boolean;
  onBlockClick: BlockGroupWrapperPropsInterface['onBlockClick'];
  onGroupClick: BlockGroupWrapperPropsInterface['onGroupClick'];
  onUpdateTitle: BlockGroupWrapperPropsInterface['onUpdateTitle'];
}

const StyledBlockGroupMemberList = styled.div<{ parentActived: boolean }>`
  flex-direction: column;
  font-size: inherit;
  color: white;

  ${({ parentActived, theme }) =>
    parentActived &&
    css`
      background-color: ${theme.color.layout.blockGroupToggle.childrenBg};
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
  members,
  onBlockClick,
  onGroupClick,
  onUpdateTitle,
}: BlockGroupMemberListPropsInterface) {
  return (
    <StyledBlockGroupMemberList parentActived={actived}>
      {members.map((member) => (
        <MemberFactory
          depth={depth}
          key={member.id}
          member={member}
          activeId={activeId}
          onGroupClick={onGroupClick}
          onBlockClick={onBlockClick}
          onUpdateTitle={onUpdateTitle}
        />
      ))}
    </StyledBlockGroupMemberList>
  );
}
