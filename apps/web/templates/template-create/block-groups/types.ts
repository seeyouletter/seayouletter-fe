import { PropsWithChildren } from 'react';

import { BlockGroupPriorities, BlockMemberType } from 'ui';

export interface NodeListPropsInterface {
  depth: BlockGroupPriorities['depth'];
  listItems: BlockMemberType[];
}

export interface NodeItemFactoryPropsInterface extends BlockGroupPriorities {
  item: BlockMemberType;
}

export interface NodeItemPropsInterface extends NodeItemFactoryPropsInterface, PropsWithChildren {}
