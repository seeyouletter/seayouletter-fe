import { TaskTypeEnum } from 'types';

import React, { FormEvent, useState } from 'react';

import { useTheme } from '@emotion/react';

import { useBlockGroupsAtom, useTemplateTaskHistories } from '@hooks/index';

import { Blocks, DefaultDivider, DefaultHStack, DefaultVStack, StrongText } from 'ui';

import { TemplatedColorInputWithTitlePresenter } from './TemplatedColorInputWithTitle';
import { TemplatedInputWithTitlePresenter } from './TemplatedInputWithTitlePresenter';

// NOTE: 작업이 끝나면 disable을 삭제한다.
/* eslint-disable no-console */
export function ActivedBlockFillModifier() {
  const theme = useTheme();

  const { activedBlockGroup, setFillBgStyle, setBgOpacity, setRemovableByBackspace } =
    useBlockGroupsAtom();

  const [blockBeforeSnapshot, setBlockBeforeSnapshot] = useState<Blocks | null>(null);

  const initializeBlockBeforeSnapshot = () => {
    setBlockBeforeSnapshot(() => null);
  };

  const { addTask } = useTemplateTaskHistories();

  if (
    activedBlockGroup === null ||
    activedBlockGroup.type === 'group' ||
    activedBlockGroup.subType === 'text'
  ) {
    return <div></div>;
  }

  const onFocusInput = () => {
    console.log('activedBlockGroup', activedBlockGroup);
    setRemovableByBackspace(false);
    setBlockBeforeSnapshot(() => activedBlockGroup);
  };

  const onChangeBg = (e: FormEvent) => {
    setFillBgStyle({
      subType: activedBlockGroup?.subType,
      type: activedBlockGroup?.type,
      id: activedBlockGroup?.id,
      bg: (e.target as HTMLInputElement).value,
    });
  };

  const onChangeBgOpacity = (e: FormEvent) => {
    if (activedBlockGroup.type !== 'block') return;

    setBgOpacity({
      subType: activedBlockGroup?.subType,
      type: activedBlockGroup?.type,
      id: activedBlockGroup?.id,
      opacity: (e.target as HTMLInputElement).value,
    });
  };

  const onBlur = () => {
    setRemovableByBackspace(true);

    addTask({
      taskType: TaskTypeEnum.update,
      before: blockBeforeSnapshot,
      after: activedBlockGroup,
    });

    initializeBlockBeforeSnapshot();
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
            onFocus={onFocusInput}
            onBlur={onBlur}
          />

          <TemplatedInputWithTitlePresenter
            direction="vertical"
            inputWidth="48px"
            title="투명도"
            placeholder="입력"
            value={activedBlockGroup.style.opacity}
            onChange={onChangeBgOpacity}
            onFocus={onFocusInput}
            onBlur={onBlur}
          />
        </DefaultHStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor={theme.color.white}></DefaultDivider>
    </>
  );
}
