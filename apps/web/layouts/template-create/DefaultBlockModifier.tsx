import React from 'react';

import {
  ActivedBlockBorderModifier,
  ActivedBlockFillModifier,
  ActivedBlockPositionSizeModifier,
} from '@templates/index';

import { DefaultVStack } from 'ui';

export function DefaultBlockModifier() {
  return (
    <DefaultVStack spacing={5}>
      <ActivedBlockPositionSizeModifier />
      <ActivedBlockBorderModifier />
      <ActivedBlockFillModifier />
    </DefaultVStack>
  );
}
