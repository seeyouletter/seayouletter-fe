import React from 'react';

import { DefaultDivider } from '@ui/divider';
import { DefaultVStack } from '@ui/stack';

import { AnimatorGroupModifier } from './AnimatorGroupModifier';
import { BlockImageModifier } from './BlockImageModifier';
import { DefaultBlockModifier } from './DefaultBlockModifier';
import { DefaultGroupModifier } from './DefaultGroupModifier';
import { TextBlockModifier } from './TextBlockModifier';
import { BlockSubType } from './types';

export interface BlockModifierFactoryPropsInterface {
  subType: BlockSubType;
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
 * 아직 그룹에 대한 명세가 많이 없지만,s
 * 추후 확장 가능성이 있어 미리 수정하기 용이하도록 만듣다.
 */
function GroupModifierFactory({ subType }: GroupModifierFactoryPropsInterface) {
  return subType === 'animator' ? <AnimatorGroupModifier /> : <DefaultGroupModifier />;
}

function BlockModifierFactory({ subType }: BlockModifierFactoryPropsInterface) {
  if (subType === 'text') {
    return <TextBlockModifier />;
  } else {
    return (
      <DefaultVStack spacing={5}>
        <DefaultBlockModifier />
        <BlockImageModifier subType={subType} />
        <DefaultDivider horizontal borderColor="white" />
      </DefaultVStack>
    );
  }
}

export function BlockGroupModifier({ type, subType }: BlockGroupModifierPropsInterface) {
  return type === 'block' ? <BlockModifierFactory subType={subType} /> : <GroupModifierFactory />;
}
