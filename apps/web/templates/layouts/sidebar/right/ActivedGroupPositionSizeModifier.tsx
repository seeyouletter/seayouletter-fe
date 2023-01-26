import React from 'react';

import { useTheme } from '@emotion/react';

import { DefaultDivider, DefaultHStack, DefaultVStack, StrongText } from 'ui';

import { useBlockGroupsAtom } from '@hooks/useBlockGroupsAtom';

import { DEFAULT_NONE } from '@utils/contants';

import { TemplatedInputWithTitlePresenter } from './TemplatedInputWithTitlePresenter';

const TBD = '개발중';

/* eslint-disable no-console */
export function ActivedGroupPositionSizeModifier() {
  const { activedBlockGroup } = useBlockGroupsAtom();

  const theme = useTheme();

  return (
    <>
      <DefaultVStack>
        <DefaultVStack spacing={2} paddingBottom="16px">
          <StrongText size={theme.fontSize.sm} color="white">
            현재 선택한 그룹/블록
          </StrongText>

          <StrongText size={theme.fontSize.xs} color="primary">
            {activedBlockGroup?.title ?? DEFAULT_NONE}
          </StrongText>
        </DefaultVStack>

        <DefaultHStack paddingBottom="8px" justifyContent="space-between">
          <TemplatedInputWithTitlePresenter
            title="위쪽"
            placeholder="입력"
            value={TBD}
            onInput={() => {
              // eslint-disable-next-line
              console.log(TBD);
            }}
          />

          <TemplatedInputWithTitlePresenter
            title="아래쪽"
            placeholder="입력"
            value={TBD}
            onInput={() => {
              // eslint-disable-next-line
              console.log(TBD);
            }}
          />
        </DefaultHStack>

        <DefaultHStack justifyContent="space-between">
          <TemplatedInputWithTitlePresenter
            title="너비"
            placeholder="입력"
            value={TBD}
            onInput={() => {
              // eslint-disable-next-line
              console.log(TBD);
            }}
          />

          <TemplatedInputWithTitlePresenter
            title="높이"
            placeholder="입력"
            value={TBD}
            onInput={() => {
              // eslint-disable-next-line
              console.log(TBD);
            }}
          />
        </DefaultHStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor="white" />
    </>
  );
}
