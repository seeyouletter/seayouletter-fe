import React from 'react';

import { useTheme } from '@emotion/react';

import {
  DefaultButton,
  DefaultHStack,
  DefaultSelect,
  DefaultVStack,
  FullWidthButton,
  StrongText,
} from 'ui';

import { TemplatedInputWithTitlePresenter } from './TemplatedInputWithTitlePresenter';

export function ActivedImageModifier() {
  const theme = useTheme();

  return (
    <DefaultVStack spacing={3}>
      <DefaultButton size="xs">재영이의 우당탕탕 시유레터.jpg</DefaultButton>

      <DefaultHStack spacing={1} alignItems="center">
        <StrongText flexShrink size={theme.fontSize.xs} color="white">
          이미지 스타일
        </StrongText>
        <DefaultSelect
          size="xs"
          width="100%"
          height="24px"
          options={[{ label: '비율 유지하면서 채우기', value: 'contain' }]}
          onChange={() => {
            return;
          }}
          borderRadius={theme.borderRadius.hard}
          color={theme.color.white}
        />
      </DefaultHStack>

      <DefaultHStack spacing={1} alignItems="center">
        <StrongText flexShrink size={theme.fontSize.xs} color="white">
          위치 상세설정
        </StrongText>

        <FullWidthButton
          size="xs"
          borderWidth="1px"
          borderColor={theme.color.white}
          borderRadius={theme.borderRadius.hard}
          backgroundColor={theme.color.transparent}
        >
          설정하기
        </FullWidthButton>
      </DefaultHStack>

      <DefaultHStack justifyContent="space-between" alignItems="center">
        <TemplatedInputWithTitlePresenter
          direction="horizontal"
          title="상하"
          placeholder="입력"
          inputWidth="42px"
          value="50%"
          onChange={() => {
            return;
          }}
        />

        <TemplatedInputWithTitlePresenter
          direction="horizontal"
          title="좌우"
          placeholder="입력"
          inputWidth="42px"
          value="50%"
          onChange={() => {
            return;
          }}
        />

        <TemplatedInputWithTitlePresenter
          direction="horizontal"
          title="투명도"
          placeholder="입력"
          inputWidth="42px"
          value="100%"
          onChange={() => {
            return;
          }}
        />
      </DefaultHStack>
    </DefaultVStack>
  );
}
