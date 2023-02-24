import { TaskHistoryInterface, TaskTypeEnum } from 'types';

import React, { FormEvent, useState } from 'react';

import { useTheme } from '@emotion/react';

import { useBlockGroupsAtom, useTemplateTaskHistories } from '@hooks/index';

import { DEFAULT_NONE } from '@utils/index';

import {
  Blocks,
  DefaultDivider,
  DefaultHStack,
  DefaultVStack,
  GroupBlockSize,
  Position,
  StrongText,
} from 'ui';

import { TemplatedInputWithTitlePresenter } from './TemplatedInputWithTitlePresenter';

/* eslint-disable no-console */
export function ActivedBlockPositionSizeModifier() {
  const { activedBlockGroup, setPositionStyle, setSizeStyle, setRemovableByBackspace } =
    useBlockGroupsAtom();

  const [blockBeforeSnapshot, setBlockBeforeSnapshot] = useState<Blocks | null>(null);

  const initializeBlockBeforeSnapshot = () => {
    setBlockBeforeSnapshot(() => null);
  };

  const { addTask } = useTemplateTaskHistories();

  const theme = useTheme();

  if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return <div></div>;

  const onFocusInput = () => {
    setRemovableByBackspace(false);
    setBlockBeforeSnapshot(() => activedBlockGroup);
  };

  const onInputPosition = (e: FormEvent, key: keyof Position) => {
    if (
      activedBlockGroup === null ||
      activedBlockGroup.type !== 'block' ||
      activedBlockGroup.id === null
    ) {
      return;
    }

    setPositionStyle({
      type: 'block',
      id: activedBlockGroup.id,
      position: {
        ...activedBlockGroup.style.position,
        [key]: (e.target as HTMLInputElement).value,
      },
    });
  };

  const onInputSize = (e: FormEvent, key: keyof GroupBlockSize) => {
    if (
      activedBlockGroup === null ||
      activedBlockGroup.type !== 'block' ||
      activedBlockGroup.id === null
    ) {
      return;
    }

    setSizeStyle({
      type: 'block',
      id: activedBlockGroup.id,
      size: {
        ...activedBlockGroup.style.size,
        [key]: (e.target as HTMLInputElement).value,
      },
    });
  };

  const onBlurPosition = (e: FormEvent, key: keyof Position) => {
    if (
      activedBlockGroup === null ||
      activedBlockGroup.type !== 'block' ||
      activedBlockGroup.id === null
    ) {
      return;
    }

    const nowTask = {
      taskType: TaskTypeEnum.update,
      before: blockBeforeSnapshot,
      after: {
        ...activedBlockGroup,
        style: {
          ...activedBlockGroup.style,
          position: {
            ...activedBlockGroup.style.position,
            [key]: (e.target as HTMLInputElement).value,
          },
        },
      },
    };

    if (activedBlockGroup.subType !== 'text') {
      addTask(nowTask as TaskHistoryInterface);
    } else {
      addTask(nowTask as TaskHistoryInterface);
    }

    setRemovableByBackspace(true);
    initializeBlockBeforeSnapshot();
  };

  const onBlurSize = (e: FormEvent, key: keyof GroupBlockSize) => {
    if (
      activedBlockGroup === null ||
      activedBlockGroup.type !== 'block' ||
      activedBlockGroup.id === null
    ) {
      return;
    }

    const nowTask = {
      taskType: TaskTypeEnum.update,
      before: blockBeforeSnapshot,
      after: {
        ...activedBlockGroup,
        style: {
          ...activedBlockGroup.style,
          size: {
            ...activedBlockGroup.style.size,
            [key]: (e.target as HTMLInputElement).value,
          },
        },
      },
    };

    if (activedBlockGroup.subType !== 'text') {
      addTask(nowTask as TaskHistoryInterface);
    } else {
      addTask(nowTask as TaskHistoryInterface);
    }

    setRemovableByBackspace(true);
    initializeBlockBeforeSnapshot();
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
            direction="horizontal"
            title="위쪽"
            placeholder="입력"
            value={activedBlockGroup?.style?.position.top ?? DEFAULT_NONE}
            onChange={(e) => onInputPosition(e, 'top')}
            onFocus={onFocusInput}
            onBlur={(e) => onBlurPosition(e, 'top')}
          />

          <TemplatedInputWithTitlePresenter
            direction="horizontal"
            title="왼쪽"
            placeholder="입력"
            value={activedBlockGroup?.style?.position.left ?? DEFAULT_NONE}
            onChange={(e) => onInputPosition(e, 'left')}
            onFocus={onFocusInput}
            onBlur={(e) => onBlurPosition(e, 'left')}
          />
        </DefaultHStack>

        <DefaultHStack justifyContent="space-between">
          <TemplatedInputWithTitlePresenter
            direction="horizontal"
            title="너비"
            placeholder="입력"
            value={activedBlockGroup?.style?.size.width ?? DEFAULT_NONE}
            onChange={(e) => onInputSize(e, 'width')}
            onFocus={onFocusInput}
            onBlur={(e) => onBlurSize(e, 'width')}
          />

          <TemplatedInputWithTitlePresenter
            direction="horizontal"
            title="높이"
            placeholder="입력"
            value={activedBlockGroup?.style?.size.height ?? DEFAULT_NONE}
            onChange={(e) => onInputSize(e, 'height')}
            onFocus={onFocusInput}
            onBlur={(e) => onBlurSize(e, 'height')}
          />
        </DefaultHStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor="white" />
    </>
  );
}
