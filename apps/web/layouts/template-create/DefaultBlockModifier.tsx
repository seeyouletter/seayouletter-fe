import React from 'react';

import { DefaultVStack } from 'ui';

import {
  ActivedBlockBorderModifier,
  ActivedBlockFillModifier,
  ActivedBlockPositionSizeModifier,
} from '@templates/index';

export function DefaultBlockModifier() {
  return (
    <DefaultVStack spacing={5}>
      <ActivedBlockPositionSizeModifier />
      <ActivedBlockBorderModifier />
      <ActivedBlockFillModifier />
    </DefaultVStack>
  );
}
