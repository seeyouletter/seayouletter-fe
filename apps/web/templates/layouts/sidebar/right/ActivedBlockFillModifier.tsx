import React, { FormEvent } from 'react';

import { useTheme } from '@emotion/react';

import { DefaultDivider, DefaultHStack, DefaultVStack, StrongText } from 'ui';

import { useBlockGroupsAtom } from '@hooks/useBlockGroupsAtom';

import { TemplatedColorInputWithTitlePresenter } from './TemplatedColorInputWithTitle';
import { TemplatedInputWithTitlePresenter } from './TemplatedInputWithTitlePresenter';

// NOTE: 작업이 끝나면 disable을 삭제한다.
/* eslint-disable no-console */
export function ActivedBlockFillModifier() {
  const theme = useTheme();

  const { activedBlockGroup, setFillBgStyle, setBgOpacity } = useBlockGroupsAtom();

  if (activedBlockGroup === null) return <div></div>;

  const onChangeBg = (e: FormEvent) => {
    setFillBgStyle({
      subType: activedBlockGroup?.subType,
      type: activedBlockGroup?.type,
      id: activedBlockGroup?.id,
      bg: (e.target as HTMLInputElement).value,
    });
  };
  const onChangeBgOpacity = (e: FormEvent) => {
    setBgOpacity({
      subType: activedBlockGroup?.subType,
      type: activedBlockGroup?.type,
      id: activedBlockGroup?.id,
      opacity: (e.target as HTMLInputElement).value,
    });
  };

  return (
    <>
      <DefaultVStack spacing={4}>
        <StrongText size={theme.fontSize.sm} color="white">
          블록 채우기
        </StrongText>

        <DefaultHStack spacing={2}>
          <TemplatedColorInputWithTitlePresenter
            direction="vertical"
            title="색상"
            value={activedBlockGroup.style.bg}
            onChange={onChangeBg}
          />

          <TemplatedInputWithTitlePresenter
            direction="vertical"
            inputWidth="60px"
            title="색상번호"
            placeholder="입력"
            value={activedBlockGroup.style.bg}
            onChange={onChangeBg}
          />

          <TemplatedInputWithTitlePresenter
            direction="vertical"
            inputWidth="48px"
            title="투명도"
            placeholder="입력"
            value={activedBlockGroup.style.opacity}
            onChange={onChangeBgOpacity}
          />
        </DefaultHStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor={theme.color.white}></DefaultDivider>
    </>
  );
}
