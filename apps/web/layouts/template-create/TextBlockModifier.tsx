import React from 'react';

import { DefaultVStack } from 'ui';

import { ActivedPositionModifier, ActivedTextModifier } from '@templates/index';

export function TextBlockModifier() {
  return (
    <DefaultVStack spacing={5}>
      <ActivedPositionModifier />
      <ActivedTextModifier />
    </DefaultVStack>
  );
}
