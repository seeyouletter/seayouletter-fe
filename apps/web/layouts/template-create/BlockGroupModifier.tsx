import React from 'react';

import { AnimatorGroupModifier } from './AnimatorGroupModifier';
import { DefaultBlockModifier } from './DefaultBlockModifier';
import { DefaultGroupModifier } from './DefaultGroupModifier';
import { ImageBlockModifier } from './ImageBlockModifier';
import { TextBlockModifier } from './TextBlockModifier';

export interface BlockModifierFactoryPropsInterface {
  subType: 'text' | 'shape' | 'image';
}

export interface BlockModifierPropsInterface extends BlockModifierFactoryPropsInterface {
  type: 'block';
}

export interface GroupModifierFactoryPropsInterface {
  subType?: 'animator';
}

export interface GroupModifierPropsInterface extends GroupModifierFactoryPropsInterface {
  type: 'group';
}

export type BlockGroupModifierPropsInterface =
  | BlockModifierPropsInterface
  | GroupModifierPropsInterface;

/**
 * @description
 * 아직 그룹에 대한 명세가 많이 없지만,
 * 추후 확장 가능성이 있어 미리 수정하기 용이하도록 만듣다.
 */
function GroupModifierFactory({ subType }: GroupModifierFactoryPropsInterface) {
  return subType === 'animator' ? <AnimatorGroupModifier /> : <DefaultGroupModifier />;
}

function BlockModifierFactory({ subType }: BlockModifierFactoryPropsInterface) {
  if (subType === 'text') {
    return <TextBlockModifier />;
  } else if (subType === 'image') {
    return <ImageBlockModifier />;
  } else {
    return <DefaultBlockModifier />;
  }
}

export function BlockGroupModifier({ type, subType }: BlockGroupModifierPropsInterface) {
  return type === 'block' ? <BlockModifierFactory subType={subType} /> : <GroupModifierFactory />;
}
