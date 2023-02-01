import React from 'react';

import { ActivedBlockPositionSizeModifier, ActivedTextModifier } from '@templates/index';

import { DefaultVStack } from 'ui';

export function TextBlockModifier() {
  return (
    <DefaultVStack spacing={5}>
      <ActivedBlockPositionSizeModifier />
      <ActivedTextModifier />
    </DefaultVStack>
  );
}
