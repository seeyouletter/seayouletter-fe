import React from 'react';

import { BlockGroupWrapper } from '@ui/block-group/Wrapper';

import Block from './Block';
import { BlockMemberType, ClickEvent, IdType } from './types';

interface BlockGroupMemberPropsInterface {
  member: BlockMemberType;
  activeId: IdType;
  onGroupClick: ClickEvent;
  onBlockClick: ClickEvent;
}

export function MemberFactory({
  member,
  onBlockClick,
  onGroupClick,
  activeId,
}: BlockGroupMemberPropsInterface) {
  if (member.type === 'group') {
    return (
      <BlockGroupWrapper
        parent={member.parent}
        type="group"
        id={member.id}
        activeId={activeId}
        title={member.title}
        blocks={member.blocks}
        onGroupClick={onGroupClick}
        onBlockClick={onBlockClick}
      />
    );
  } else {
    return (
      <Block
        type="block"
        id={member.id}
        activeId={activeId}
        title={member.title}
        onBlockClick={onBlockClick}
      ></Block>
    );
  }
}
