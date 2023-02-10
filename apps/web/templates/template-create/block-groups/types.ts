import { PropsWithChildren } from 'react';

import { Blocks, Groups } from 'ui';

export interface NodeListPropsInterface {
  listItems: (Blocks | Groups)[];
}

export interface NodeItemFactoryPropsInterface {
  item: Blocks | Groups;
}

export interface NodeItemPropsInterface extends NodeItemFactoryPropsInterface, PropsWithChildren {}
