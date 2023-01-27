import React from 'react';

import { useTheme } from '@emotion/react';

import { DefaultDivider, DefaultHStack, DefaultVStack, StrongText } from 'ui';

import { TemplatedInputWithTitlePresenter } from './TemplatedInputWithTitlePresenter';

/* eslint-disable no-console */
export function ActivedTextModifier() {
  const theme = useTheme();

  return (
    <>
      <DefaultVStack spacing={4}>
        <StrongText color="white" size={theme.fontSize.sm}>
          글자 속성
        </StrongText>

        <DefaultVStack spacing={2}>
          <DefaultHStack justifyContent="space-between">
            <TemplatedInputWithTitlePresenter
              direction="horizontal"
              title="크기"
              placeholder="입력"
              onChange={() => {
                console.log('왼쪽');
              }}
            />

            <TemplatedInputWithTitlePresenter
              direction="horizontal"
              title="굵기"
              placeholder="입력"
              onChange={() => {
                console.log('왼쪽');
              }}
            />
          </DefaultHStack>

          <DefaultHStack justifyContent="space-between">
            <TemplatedInputWithTitlePresenter
              direction="horizontal"
              title="색상"
              placeholder="입력"
              onChange={() => {
                console.log('왼쪽');
              }}
            />

            <TemplatedInputWithTitlePresenter
              direction="horizontal"
              title="스타일"
              placeholder="입력"
              onChange={() => {
                console.log('왼쪽');
              }}
            />
          </DefaultHStack>

          <DefaultHStack justifyContent="space-between">
            <TemplatedInputWithTitlePresenter
              direction="horizontal"
              title="글꼴"
              inputWidth="200px"
              placeholder="입력"
              onChange={() => {
                console.log('왼쪽');
              }}
            />
          </DefaultHStack>
        </DefaultVStack>
      </DefaultVStack>
      <DefaultDivider horizontal size="100%" borderColor={theme.color.white}></DefaultDivider>
    </>
  );
}
