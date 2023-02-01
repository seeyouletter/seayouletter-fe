import React from 'react';

import { DefaultDivider } from '@ui/divider';
import { DefaultVStack } from '@ui/stack';

import { AnimatorGroupModifier } from './AnimatorGroupModifier';
import { BlockImageModifier } from './BlockImageModifier';
import { DefaultBlockModifier } from './DefaultBlockModifier';
import { DefaultGroupModifier } from './DefaultGroupModifier';
import { TextBlockModifier } from './TextBlockModifier';
import {
  BlockGroupModifierPropsInterface,
  BlockModifierFactoryPropsInterface,
  GroupModifierFactoryPropsInterface,
} from './types';

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

export function BlockGroupModifier({ blockGroup }: BlockGroupModifierPropsInterface) {
  if (blockGroup.type === 'block') {
    return <BlockModifierFactory subType={blockGroup.subType} />;
  } else {
    return <GroupModifierFactory subType={blockGroup.subType} />;
  }
}
