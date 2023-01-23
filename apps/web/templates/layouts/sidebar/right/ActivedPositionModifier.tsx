import React from 'react';

import { useTheme } from '@emotion/react';

import { DefaultDivider, DefaultHStack, DefaultVStack, StrongText } from 'ui';

import { TemplatedInputWithTitlePresenter } from './TemplatedInputWithTitlePresenter';

/* eslint-disable no-console */
export function ActivedPositionModifier() {
  const theme = useTheme();
  return (
    <>
      <DefaultVStack>
        <DefaultVStack spacing={1} paddingBottom="16px">
          <StrongText size={theme.fontSize.sm} color="white">
            현재 선택한 그룹
          </StrongText>
          <StrongText size={theme.fontSize.xs} color="primary">
            헤더 - 링크(오시는 길)
          </StrongText>
        </DefaultVStack>

        <DefaultHStack paddingBottom="8px" justifyContent="space-between">
          <TemplatedInputWithTitlePresenter
            title="왼쪽"
            placeholder="입력"
            onInput={() => {
              console.log('왼쪽');
            }}
          />

          <TemplatedInputWithTitlePresenter
            title="오른쪽"
            placeholder="입력"
            onInput={() => {
              console.log('오른쪽');
            }}
          />
        </DefaultHStack>

        <DefaultHStack justifyContent="space-between">
          <TemplatedInputWithTitlePresenter
            title="왼쪽"
            placeholder="입력"
            onInput={() => {
              console.log('왼쪽');
            }}
          />

          <TemplatedInputWithTitlePresenter
            title="오른쪽"
            placeholder="입력"
            onInput={() => {
              console.log('오른쪽');
            }}
          />
        </DefaultHStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor="white" />
    </>
  );
}
