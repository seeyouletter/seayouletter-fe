import React from 'react';

import { DefaultVStack } from 'ui';

import { ActivedGroupColorsModifier, ActivedPositionModifier } from '@templates/index';

export function DefaultGroupModifier() {
  return (
    <DefaultVStack spacing={5}>
      <ActivedPositionModifier />
      <ActivedGroupColorsModifier />
    </DefaultVStack>
  );
}
