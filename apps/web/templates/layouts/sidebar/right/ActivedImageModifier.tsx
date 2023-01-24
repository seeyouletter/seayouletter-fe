import React from 'react';

import { useTheme } from '@emotion/react';

import {
  DefaultButton,
  DefaultHStack,
  DefaultInput,
  DefaultSelect,
  DefaultVStack,
  FullWidthButton,
  StrongText,
} from 'ui';

export function ActivedImageModifier() {
  const theme = useTheme();

  return (
    <DefaultVStack spacing={3}>
      <DefaultButton size="xs">재영이의 우당탕탕 시유레터.jpg</DefaultButton>

      <DefaultHStack spacing={2} alignItems="center">
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

      <DefaultHStack spacing={2} alignItems="center">
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
        <DefaultHStack spacing={1} alignItems="center">
          <StrongText flexShrink size={theme.fontSize.xs} color="white">
            상하
          </StrongText>
          <DefaultInput
            width="42px"
            size="xs"
            placeholder="입력"
            bgColor={theme.color.darkGray}
            borderColor={theme.color.darkGray}
            padding="4px"
            color="white"
          />
        </DefaultHStack>

        <DefaultHStack spacing={1} alignItems="center">
          <StrongText flexShrink size={theme.fontSize.xs} color="white">
            좌우
          </StrongText>
          <DefaultInput
            width="42px"
            size="xs"
            placeholder="입력"
            bgColor={theme.color.darkGray}
            borderColor={theme.color.darkGray}
            padding="4px"
            color="white"
          />
        </DefaultHStack>

        <DefaultHStack spacing={1} alignItems="center">
          <StrongText flexShrink size={theme.fontSize.xs} color="white">
            투명도
          </StrongText>
          <DefaultInput
            width="42px"
            size="xs"
            placeholder="입력"
            bgColor={theme.color.darkGray}
            borderColor={theme.color.darkGray}
            padding="4px"
            color="white"
          />
        </DefaultHStack>
      </DefaultHStack>
    </DefaultVStack>
  );
}
