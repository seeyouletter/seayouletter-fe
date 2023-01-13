import React from 'react';

import { BlockGroupWrapper } from '@ui/block-group/Wrapper';

import Block from './Block';
import { BlockGroupWrapperPropsInterface, BlockPropsInterface } from './types';

interface BlockGroupMemberPropsInterface
  extends BlockPropsInterface,
    BlockGroupWrapperPropsInterface {}

export function MemberFactory({
  type,
  id,
  title,
  onBlockClick,
  onGroupClick,
  activeId,
  blocks,
}: BlockGroupMemberPropsInterface) {
  if (type === 'group') {
    return (
      <BlockGroupWrapper
        type="group"
        id={id}
        activeId={activeId}
        title={title}
        blocks={blocks}
        onGroupClick={onGroupClick}
        onBlockClick={onBlockClick}
      />
    );
  } else {
    return (
      <Block
        type="block"
        id={id}
        activeId={activeId}
        title={title}
        onBlockClick={onBlockClick}
      ></Block>
    );
  }
}
