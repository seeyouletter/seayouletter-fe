import React from 'react';

import { useTheme } from '@emotion/react';

import {
  ColorInput,
  DefaultBox,
  DefaultDivider,
  DefaultHStack,
  DefaultInput,
  DefaultText,
  DefaultVStack,
  StrongText,
} from 'ui';

export function ActivedBlockBorderModifier() {
  const theme = useTheme();
  return (
    <>
      <DefaultVStack spacing={4}>
        <StrongText size={theme.fontSize.sm} color="white">
          블록 테두리
        </StrongText>

        <DefaultVStack spacing={1}>
          <DefaultHStack spacing={2}>
            <DefaultBox width="72px">
              <StrongText size={theme.fontSize.xs} color="white">
                테두리
              </StrongText>
            </DefaultBox>
            <DefaultBox width="42px">
              <StrongText size={theme.fontSize.xs} color="white">
                두께
              </StrongText>
            </DefaultBox>
            <DefaultBox width="42px">
              <StrongText size={theme.fontSize.xs} color="white">
                둥글기
              </StrongText>
            </DefaultBox>
            <DefaultBox width="48px">
              <StrongText size={theme.fontSize.xs} color="white">
                스타일
              </StrongText>
            </DefaultBox>
          </DefaultHStack>

          <DefaultHStack spacing={2}>
            <DefaultVStack>
              <DefaultHStack>
                <DefaultBox border="0.5px solid white" width="20px" height="20px" />
                <DefaultBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="0.5px solid white"
                  width="32px"
                  height="20px"
                >
                  <DefaultText size={theme.fontSize.xs} color={theme.color.white}>
                    상
                  </DefaultText>
                </DefaultBox>
                <DefaultBox border="0.5px solid white" width="20px" height="20px" />
              </DefaultHStack>

              <DefaultHStack>
                <DefaultBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="0.5px solid white"
                  width="20px"
                  height="32px"
                >
                  <DefaultText
                    textAlign="center"
                    size={theme.fontSize.xs}
                    color={theme.color.white}
                  >
                    좌
                  </DefaultText>
                </DefaultBox>
                <DefaultBox border="0.5px solid white" width="32px" height="32px" />
                <DefaultBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="0.5px solid white"
                  width="20px"
                  height="32px"
                >
                  <DefaultText
                    textAlign="center"
                    size={theme.fontSize.xs}
                    color={theme.color.white}
                  >
                    우
                  </DefaultText>
                </DefaultBox>
              </DefaultHStack>
              <DefaultHStack>
                <DefaultBox border="0.5px solid white" width="20px" height="20px" />
                <DefaultBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="0.5px solid white"
                  width="32px"
                  height="20px"
                >
                  <DefaultText
                    textAlign="center"
                    size={theme.fontSize.xs}
                    color={theme.color.white}
                  >
                    하
                  </DefaultText>
                </DefaultBox>
                <DefaultBox border="0.5px solid white" width="20px" height="20px" />
              </DefaultHStack>
            </DefaultVStack>
            <DefaultVStack spacing={1}>
              <DefaultHStack spacing={2}>
                <DefaultInput
                  width="42px"
                  size="xs"
                  placeholder="입력"
                  bgColor={theme.color.darkGray}
                  borderColor={theme.color.darkGray}
                  padding="4px"
                  color="white"
                />
                <DefaultInput
                  width="42px"
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

              <DefaultVStack spacing={1}>
                <DefaultHStack spacing={2}>
                  <DefaultBox width="24px">
                    <StrongText size={theme.fontSize.xs} color="white">
                      색상
                    </StrongText>
                  </DefaultBox>
                  <DefaultBox width="60px">
                    <StrongText size={theme.fontSize.xs} color="white">
                      색상번호
                    </StrongText>
                  </DefaultBox>
                  <DefaultBox width="48px">
                    <StrongText size={theme.fontSize.xs} color="white">
                      투명도
                    </StrongText>
                  </DefaultBox>
                </DefaultHStack>

                <DefaultHStack spacing={2}>
                  <ColorInput value="black" size="xs" width="24px"></ColorInput>
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
          </DefaultHStack>
        </DefaultVStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor="white" />
    </>
  );
}
