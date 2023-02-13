import React from 'react';

import { BlockMemberType, IdType } from '@ui/types';

import { Block } from './Block';

/* eslint-disable-next-line import/no-cycle */
import { BlockGroupWrapper } from './Wrapper';
import { BlockEvents, BlockHoverEvent, ClickEventWithType, UpdateTitleEvent } from './types';

interface BlockGroupMemberPropsInterface extends BlockEvents {
  activeId: IdType;
  hoverId: IdType;

  depth: number;
  order: number;
  member: BlockMemberType;

  onBlockHover: BlockHoverEvent;
  onGroupClick: ClickEventWithType;
  onUpdateTitle: UpdateTitleEvent;
}

export function MemberFactory({
  activeId,
  hoverId,

  depth,
  order,
  member,
  onBlockClick,
  onBlockHover,

  onGroupClick,

  onUpdateTitle,
}: BlockGroupMemberPropsInterface) {
  if (member.type === 'group') {
    return (
      <BlockGroupWrapper
        activeId={activeId}
        hoverId={hoverId}
        depth={depth}
        order={order}
        parent={member.parent}
        type="group"
        id={member.id}
        title={member.title}
        blocks={member.blocks}
        onGroupClick={onGroupClick}
        onBlockClick={onBlockClick}
        onBlockHover={onBlockHover}
        toggled={member.toggled}
        onUpdateTitle={onUpdateTitle}
      />
    );
  } else {
    return (
      <Block
        activeId={activeId}
        hoverId={hoverId}
        depth={depth}
        order={order}
        parent={member.parent}
        type="block"
        id={member.id}
        title={member.title}
        onBlockClick={onBlockClick}
        onBlockHover={onBlockHover}
        onUpdateTitle={onUpdateTitle}
      />
    );
  }
}
