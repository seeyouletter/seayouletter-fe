import React from 'react';

import { ActivedGroupColorsModifier, ActivedGroupPositionSizeModifier } from '@templates/index';

import { DefaultVStack } from 'ui';

export function DefaultGroupModifier() {
  return (
    <DefaultVStack spacing={5}>
      <ActivedGroupPositionSizeModifier />
      <ActivedGroupColorsModifier />
    </DefaultVStack>
  );
}
