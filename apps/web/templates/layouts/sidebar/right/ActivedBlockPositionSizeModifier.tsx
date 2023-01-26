import React, { FormEvent } from 'react';

import { useTheme } from '@emotion/react';

import { DefaultDivider, DefaultHStack, DefaultVStack, Position, StrongText } from 'ui';

import { useBlockGroupsAtom } from '@hooks/useBlockGroupsAtom';

import { DEFAULT_NONE } from '@utils/contants';

import { TemplatedInputWithTitlePresenter } from './TemplatedInputWithTitlePresenter';

/* eslint-disable no-console */
export function ActivedBlockPositionSizeModifier() {
  const { activedBlockGroup, setPositionStyle } = useBlockGroupsAtom();

  const theme = useTheme();

  const onInputPosition = (e: FormEvent, key: keyof Position) => {
    if (activedBlockGroup === null || activedBlockGroup.id === null) return;
    setPositionStyle({
      type: 'block',
      id: activedBlockGroup.id,
      position: {
        ...activedBlockGroup.style.position,
        [key]: (e.target as HTMLInputElement).value,
      },
    });
  };

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
            value={activedBlockGroup?.style?.position.top}
            onInput={(e) => onInputPosition(e, 'left')}
          />

          <TemplatedInputWithTitlePresenter
            title="아래쪽"
            placeholder="입력"
            value={activedBlockGroup?.style?.position.bottom}
            onInput={(e) => onInputPosition(e, 'bottom')}
          />
        </DefaultHStack>

        <DefaultHStack justifyContent="space-between">
          <TemplatedInputWithTitlePresenter
            title="너비"
            placeholder="입력"
            value={activedBlockGroup?.style?.size.width}
            onInput={() => {
              console.log('너비');
            }}
          />

          <TemplatedInputWithTitlePresenter
            title="높이"
            placeholder="입력"
            value={activedBlockGroup?.style?.size.height}
            onInput={() => {
              console.log('높이');
            }}
          />
        </DefaultHStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor="white" />
    </>
  );
}
