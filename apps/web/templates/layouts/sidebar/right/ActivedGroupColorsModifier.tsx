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

  const blockColors = [
    {
      color: '#752bed',
      opacity: '100%',
      blocks: ['블록1', '블록2', '블록3'],
    },
    {
      color: '#752bed',
      opacity: '100%',
      blocks: ['블록1', '블록2', '블록3'],
    },
    {
      color: '#752bed',
      opacity: '100%',
      blocks: ['블록1', '블록2', '블록3'],
    },
  ];

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
            <DefaultBox width="48px">
              <StrongText size={theme.fontSize.xs} color="white">
                투명도
              </StrongText>
            </DefaultBox>
          </DefaultHStack>

          {blockColors.map((blockColor, idx) => (
            <DefaultHStack key={idx} spacing={1}>
              <DefaultBox width="48px">
                <ColorInput
                  aria-label="색상 선택"
                  size="xs"
                  value={blockColor.color}
                  onChange={() => {
                    return;
                  }}
                />
              </DefaultBox>

              <DefaultBox width="60px">
                <DefaultInput
                  aria-label="색상번호 입력"
                  size="xs"
                  placeholder="입력"
                  bgColor={theme.color.darkGray}
                  borderColor={theme.color.darkGray}
                  padding="4px"
                  color="white"
                  value={blockColor.color}
                  onChange={() => {
                    return;
                  }}
                />
              </DefaultBox>

              <DefaultBox width="48px">
                <DefaultInput
                  aria-label="투명도 입력"
                  size="xs"
                  placeholder="입력"
                  bgColor={theme.color.darkGray}
                  borderColor={theme.color.darkGray}
                  padding="4px"
                  color="white"
                  value={blockColor.opacity}
                  onChange={() => {
                    return;
                  }}
                />
              </DefaultBox>
            </DefaultHStack>
          ))}
        </DefaultVStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor="white" />
    </>
  );
}
