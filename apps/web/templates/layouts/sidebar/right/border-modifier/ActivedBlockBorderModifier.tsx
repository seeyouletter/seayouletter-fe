import React from 'react';

import { useTheme } from '@emotion/react';

import { DefaultDivider, DefaultHStack, DefaultVStack, StrongText } from 'ui';

import { useBorderMatrix } from '@hooks/index';

import { BorderMatrix } from './Matrix';
import { BorderSubModifierFactory } from './SubModifier';

/* eslint-disable no-console */
export function ActivedBlockBorderModifier() {
  const theme = useTheme();
  const { blockBorderState } = useBorderMatrix();

  return (
    <>
      <DefaultVStack spacing={4}>
        <StrongText size={theme.fontSize.sm} color="white">
          블록 테두리({blockBorderState.name})
        </StrongText>

        <DefaultHStack spacing={2}>
          <BorderMatrix />
          <BorderSubModifierFactory />
        </DefaultHStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor="white" />
    </>
  );
}
