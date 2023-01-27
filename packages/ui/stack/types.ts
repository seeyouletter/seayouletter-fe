import { PropsWithChildren } from 'react';

import { StackProps } from '@chakra-ui/react';

export interface StackStyledInterface {
  center: boolean;
}

export type StackPropsInterface = PropsWithChildren<StackStyledInterface>;

export interface StackInterface extends Omit<StackProps, 'inline'> {
  inline?: StackProps['isInline'];
}

export interface StackFactoryPropsInterface extends PropsWithChildren {
  direction: 'vertical' | 'horizontal';
  container: StackInterface;
}

export type DefaultHStackInterface = StackInterface;
export type DefaultVStackInterface = StackInterface;
