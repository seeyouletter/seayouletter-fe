import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { MemberFactory } from '@ui/block-group/Member';

import { BlockGroupWrapperPropsInterface, BlockMembersType } from './types';

export interface BlockGroupMemberListPropsInterface
  extends Omit<BlockGroupWrapperPropsInterface, 'type' | 'id' | 'title' | 'blocks'> {
  members: BlockMembersType;
  actived: boolean;
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
  activeId,
  actived,
  members,
  onBlockClick,
  onGroupClick,
}: BlockGroupMemberListPropsInterface) {
  return (
    <StyledBlockGroupMemberList parentActived={actived}>
      {members.map((member) => (
        <MemberFactory
          type={member.type}
          activeId={activeId}
          id={member.id}
          title={member.title}
          blocks={members}
          onGroupClick={onGroupClick}
          onBlockClick={onBlockClick}
        />
      ))}
    </StyledBlockGroupMemberList>
  );
}
