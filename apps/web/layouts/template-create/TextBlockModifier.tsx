import React from 'react';

import { DefaultVStack } from '@ui/stack';

import { ActivedPositionModifier } from '@templates/layouts';
import ActivedTextModifier from '@templates/layouts/sidebar/right/ActivedTextModifier';

export function TextBlockModifier() {
  return (
    <DefaultVStack spacing={5}>
      <ActivedPositionModifier />
      <ActivedTextModifier />
    </DefaultVStack>
  );
}
