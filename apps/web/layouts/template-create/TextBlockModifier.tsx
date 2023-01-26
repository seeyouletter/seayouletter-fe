import React from 'react';

import { DefaultVStack } from 'ui';

import { ActivedBlockPositionSizeModifier, ActivedTextModifier } from '@templates/index';

export function TextBlockModifier() {
  return (
    <DefaultVStack spacing={5}>
      <ActivedBlockPositionSizeModifier />
      <ActivedTextModifier />
    </DefaultVStack>
  );
}
