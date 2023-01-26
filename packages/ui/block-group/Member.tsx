import React from 'react';

import { Block } from './Block';

/* eslint-disable-next-line import/no-cycle */
import { BlockGroupWrapper } from './Wrapper';
import { BlockMemberType, ClickEvent, IdType, UpdateTitleEvent } from './types';

interface BlockGroupMemberPropsInterface {
  depth: number;
  member: BlockMemberType;
  activeId: IdType;
  onGroupClick: ClickEvent;
  onBlockClick: ClickEvent;
  onUpdateTitle: UpdateTitleEvent;
}

export function MemberFactory({
  depth,
  member,
  onBlockClick,
  onGroupClick,
  activeId,
  onUpdateTitle,
}: BlockGroupMemberPropsInterface) {
  if (member.type === 'group') {
    return (
      <BlockGroupWrapper
        depth={depth}
        parent={member.parent}
        type="group"
        id={member.id}
        activeId={activeId}
        title={member.title}
        blocks={member.blocks}
        onGroupClick={onGroupClick}
        onBlockClick={onBlockClick}
        toggled={member.toggled}
        onUpdateTitle={onUpdateTitle}
      />
    );
  } else {
    return (
      <Block
        depth={depth}
        parent={member.parent}
        type="block"
        id={member.id}
        activeId={activeId}
        title={member.title}
        onBlockClick={onBlockClick}
        onUpdateTitle={onUpdateTitle}
      />
    );
  }
}
