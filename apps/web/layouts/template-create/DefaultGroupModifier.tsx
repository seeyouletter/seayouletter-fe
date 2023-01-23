import React from 'react';

import { DefaultVStack } from 'ui';

import { ActivedGroupColorsModifier, ActivedGroupPositionModifier } from '@templates/index';

export function DefaultGroupModifier() {
  return (
    <DefaultVStack spacing={5}>
      <ActivedGroupPositionModifier />
      <ActivedGroupColorsModifier />
    </DefaultVStack>
  );
}
