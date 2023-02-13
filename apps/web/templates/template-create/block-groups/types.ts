import { PropsWithChildren } from 'react';

import { BlockMemberType } from 'ui';

export interface NodeListPropsInterface {
  depth: number;
  listItems: BlockMemberType[];
}

export interface NodeItemFactoryPropsInterface {
  depth: number;
  item: BlockMemberType;
  order: number;
}

export interface NodeItemPropsInterface extends NodeItemFactoryPropsInterface, PropsWithChildren {}
