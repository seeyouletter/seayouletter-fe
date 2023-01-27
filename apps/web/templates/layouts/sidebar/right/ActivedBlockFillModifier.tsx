import React from 'react';

import { useTheme } from '@emotion/react';

import { DefaultDivider, DefaultHStack, DefaultVStack, StrongText } from 'ui';

import { TemplatedColorInputWithTitlePresenter } from './TemplatedColorInputWithTitle';
import { TemplatedInputWithTitlePresenter } from './TemplatedInputWithTitlePresenter';

// NOTE: 작업이 끝나면 disable을 삭제한다.
/* eslint-disable no-console */
export function ActivedBlockFillModifier() {
  const theme = useTheme();

  return (
    <>
      <DefaultVStack spacing={4}>
        <StrongText size={theme.fontSize.sm} color="white">
          블록 채우기
        </StrongText>

        <DefaultHStack spacing={2}>
          <TemplatedColorInputWithTitlePresenter
            direction="vertical"
            title="색상"
            value={'#752bed'}
            onChange={() => {
              console.log('색상');
            }}
          />

          <TemplatedInputWithTitlePresenter
            direction="vertical"
            inputWidth="60px"
            title="색상번호"
            placeholder="입력"
            onChange={() => {
              console.log('입력');
            }}
          />

          <TemplatedInputWithTitlePresenter
            direction="vertical"
            inputWidth="48px"
            title="투명도"
            placeholder="입력"
            onChange={() => {
              console.log('입력');
            }}
          />
        </DefaultHStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor={theme.color.white}></DefaultDivider>
    </>
  );
}
