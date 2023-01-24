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

export function ActivedGroupColorsModifier() {
  const theme = useTheme();

  return (
    <>
      <DefaultVStack spacing={4}>
        <StrongText size={theme.fontSize.sm} color="white">
          그룹 내 색상
        </StrongText>

        <DefaultVStack spacing={1}>
          <DefaultHStack spacing={1}>
            <DefaultBox width="48px">
              <StrongText size={theme.fontSize.xs} color="white">
                색상
              </StrongText>
            </DefaultBox>
            <DefaultBox width="60px">
              <StrongText size={theme.fontSize.xs} color="white">
                번호
              </StrongText>
            </DefaultBox>
            <DefaultBox width="40px">
              <StrongText size={theme.fontSize.xs} color="white">
                투명도
              </StrongText>
            </DefaultBox>
          </DefaultHStack>

          <DefaultHStack spacing={1}>
            <ColorInput width="48px" size="xs" value="red" />
            <DefaultBox width="60px">
              <DefaultInput
                size="xs"
                placeholder="입력"
                bgColor={theme.color.darkGray}
                borderColor={theme.color.darkGray}
                padding="4px"
                color="white"
              />
            </DefaultBox>
            <DefaultBox width="40px">
              <DefaultInput
                size="xs"
                placeholder="입력"
                bgColor={theme.color.darkGray}
                borderColor={theme.color.darkGray}
                padding="4px"
                color="white"
              />
            </DefaultBox>
          </DefaultHStack>

          <DefaultHStack spacing={1}>
            <ColorInput width="48px" size="xs" value="red" />
            <DefaultBox width="60px">
              <DefaultInput
                size="xs"
                placeholder="입력"
                bgColor={theme.color.darkGray}
                borderColor={theme.color.darkGray}
                padding="4px"
                color="white"
              />
            </DefaultBox>
            <DefaultBox width="40px">
              <DefaultInput
                size="xs"
                placeholder="입력"
                bgColor={theme.color.darkGray}
                borderColor={theme.color.darkGray}
                padding="4px"
                color="white"
              />
            </DefaultBox>
          </DefaultHStack>
          <DefaultHStack spacing={2}>
            <ColorInput width="48px" size="xs" value="red" />
            <DefaultBox width="60px">
              <DefaultInput
                size="xs"
                placeholder="입력"
                bgColor={theme.color.darkGray}
                borderColor={theme.color.darkGray}
                padding="4px"
                color="white"
              />
            </DefaultBox>
            <DefaultBox width="48px">
              <DefaultInput
                size="xs"
                placeholder="입력"
                bgColor={theme.color.darkGray}
                borderColor={theme.color.darkGray}
                padding="4px"
                color="white"
              />
            </DefaultBox>
          </DefaultHStack>
        </DefaultVStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor="white" />
    </>
  );
}
