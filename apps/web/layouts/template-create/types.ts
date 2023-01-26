import { BlockInterface, GroupInterface } from '@ui/types';

export type GroupSubType = 'animator' | 'default';
export type BlockSubType = 'text' | 'shape' | 'image';

export interface BlockModifierFactoryPropsInterface {
  subType: BlockSubType;
}

export interface BlockImageDecoratorPropsInterface {
  subType: BlockSubType;
}

export interface GroupModifierFactoryPropsInterface {
  subType: GroupSubType;
}

export interface BlockModifierPropsInterface extends BlockModifierFactoryPropsInterface {
  type: BlockInterface['type'];
}

export interface GroupModifierPropsInterface extends GroupModifierFactoryPropsInterface {
  type: GroupInterface['type'];
}

export type BlockGroupModifierPropsInterface =
  | BlockModifierPropsInterface
  | GroupModifierPropsInterface;
