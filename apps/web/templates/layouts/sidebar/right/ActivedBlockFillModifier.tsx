import React from 'react';

import { useTheme } from '@emotion/react';

import {
  ColorInput,
  DefaultBox,
  DefaultDivider,
  DefaultHStack,
  DefaultInput,
  DefaultVStack,
  StrongText,
} from 'ui';

export function ActivedBlockFillModifier() {
  const theme = useTheme();

  return (
    <>
      <DefaultVStack spacing={4}>
        <StrongText size={theme.fontSize.sm} color="white">
          블록 채우기
        </StrongText>

        <DefaultVStack spacing={1}>
          <DefaultHStack spacing={2}>
            <DefaultBox width="48px">
              <StrongText size={theme.fontSize.xs} color="white">
                색상
              </StrongText>
            </DefaultBox>
            <DefaultBox width="60px">
              <StrongText size={theme.fontSize.xs} color="white">
                색상번호
              </StrongText>
            </DefaultBox>
            <DefaultBox width="42px">
              <StrongText size={theme.fontSize.xs} color="white">
                투명도
              </StrongText>
            </DefaultBox>
          </DefaultHStack>

          <DefaultHStack spacing={2}>
            <ColorInput value="black" size="xs" width="48px"></ColorInput>
            <DefaultInput
              width="60px"
              size="xs"
              placeholder="입력"
              bgColor={theme.color.darkGray}
              borderColor={theme.color.darkGray}
              padding="4px"
              color="white"
            />
            <DefaultInput
              width="48px"
              size="xs"
              placeholder="입력"
              bgColor={theme.color.darkGray}
              borderColor={theme.color.darkGray}
              padding="4px"
              color="white"
            />
          </DefaultHStack>
        </DefaultVStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor={theme.color.white}></DefaultDivider>
    </>
  );
}
