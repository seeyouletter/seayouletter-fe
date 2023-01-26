import React from 'react';

import { DefaultVStack } from 'ui';

import { ActivedGroupColorsModifier, ActivedGroupPositionSizeModifier } from '@templates/index';

export function DefaultGroupModifier() {
  return (
    <DefaultVStack spacing={5}>
      <ActivedGroupPositionSizeModifier />
      <ActivedGroupColorsModifier />
    </DefaultVStack>
  );
}
