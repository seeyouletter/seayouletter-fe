import { BlockInterface, GroupInterface } from '@ui/types';

export type GroupSubType = 'animator';
export type BlockSubType = 'text' | 'shape' | 'image';

export interface BlockModifierFactoryPropsInterface {
  subType: BlockSubType;
}

export interface BlockModifierPropsInterface extends BlockModifierFactoryPropsInterface {
  type: BlockInterface['type'];
}

export interface GroupModifierFactoryPropsInterface {
  subType?: GroupSubType;
}

export interface GroupModifierPropsInterface extends GroupModifierFactoryPropsInterface {
  type: GroupInterface['type'];
}

export type BlockGroupModifierPropsInterface =
  | BlockModifierPropsInterface
  | GroupModifierPropsInterface;

export interface BlockImageDecoratorPropsInterface {
  subType: BlockSubType;
}
