import React from 'react';

import { DefaultVStack } from 'ui';

import {
  ActivedBlockBorderModifier,
  ActivedBlockFillModifier,
  ActivedPositionModifier,
} from '@templates/index';

export function DefaultBlockModifier() {
  return (
    <DefaultVStack spacing={5}>
      <ActivedPositionModifier />
      <ActivedBlockBorderModifier />
      <ActivedBlockFillModifier />
    </DefaultVStack>
  );
}
