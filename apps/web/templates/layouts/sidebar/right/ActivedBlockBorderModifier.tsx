import React from 'react';

import { useTheme } from '@emotion/react';

import {
  DefaultBox,
  DefaultDivider,
  DefaultHStack,
  DefaultText,
  DefaultVStack,
  StrongText,
} from 'ui';

import { TemplatedColorInputWithTitlePresenter } from './TemplatedColorInputWithTitle';
import { TemplatedInputWithTitlePresenter } from './TemplatedInputWithTitlePresenter';

// NOTE: 작업이 끝나면 disable을 삭제한다.
/* eslint-disable no-console */

export function BorderMatrix() {
  const theme = useTheme();
  return (
    <DefaultVStack spacing={1} id="테두리">
      <DefaultBox width="72px">
        <StrongText size={theme.fontSize.xs} color="white">
          테두리
        </StrongText>
      </DefaultBox>

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
            <DefaultText textAlign="center" size={theme.fontSize.xs} color={theme.color.white}>
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
            <DefaultText textAlign="center" size={theme.fontSize.xs} color={theme.color.white}>
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
            <DefaultText textAlign="center" size={theme.fontSize.xs} color={theme.color.white}>
              하
            </DefaultText>
          </DefaultBox>
          <DefaultBox border="0.5px solid white" width="20px" height="20px" />
        </DefaultHStack>
      </DefaultVStack>
    </DefaultVStack>
  );
}

export function ActivedBlockBorderModifier() {
  const theme = useTheme();

  return (
    <>
      <DefaultVStack spacing={4}>
        <StrongText size={theme.fontSize.sm} color="white">
          블록 테두리(전체)
        </StrongText>

        <DefaultHStack spacing={2}>
          <BorderMatrix />

          <DefaultVStack spacing={2}>
            <DefaultHStack spacing={2}>
              <TemplatedInputWithTitlePresenter
                direction="vertical"
                inputWidth="42px"
                title="두께"
                placeholder="입력"
                onChange={() => {
                  console.log('입력');
                }}
              />

              <TemplatedInputWithTitlePresenter
                direction="vertical"
                inputWidth="42px"
                title="둥글기"
                placeholder="입력"
                onChange={() => {
                  console.log('입력');
                }}
              />

              <TemplatedInputWithTitlePresenter
                direction="vertical"
                inputWidth="48px"
                title="스타일"
                placeholder="입력"
                onChange={() => {
                  console.log('입력');
                }}
              />
            </DefaultHStack>

            <DefaultHStack spacing={2}>
              <TemplatedColorInputWithTitlePresenter
                direction="vertical"
                width="24px"
                title="색상"
                value="#752bed"
                onChange={() => {
                  console.log('입력');
                }}
              />

              <TemplatedInputWithTitlePresenter
                direction="vertical"
                inputWidth="60px"
                title="색상번호"
                placeholder="입력"
                value="#752bed"
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
        </DefaultHStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor="white" />
    </>
  );
}
