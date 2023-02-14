import { BlockMemberType, Blocks, Groups } from 'ui';

export interface BlockModifierFactoryPropsInterface {
  subType: Blocks['subType'];
}

export interface BlockImageDecoratorPropsInterface {
  subType: Blocks['subType'];
}

export interface GroupModifierFactoryPropsInterface {
  subType: Groups['subType'];
}

export interface BlockModifierPropsInterface extends BlockModifierFactoryPropsInterface {
  type: Blocks['type'];
}

export interface GroupModifierPropsInterface extends GroupModifierFactoryPropsInterface {
  type: Groups['type'];
}

export interface BlockGroupModifierPropsInterface {
  blockGroup: BlockMemberType;
}
