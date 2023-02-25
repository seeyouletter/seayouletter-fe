import React from 'react';

import { useTheme } from '@emotion/react';

import { useBlockGroupsAtom } from '@hooks/useBlockGroupsAtom';

import { DEFAULT_NONE } from '@utils/index';

import { DefaultDivider, DefaultHStack, DefaultVStack, StrongText } from 'ui';

import { TemplatedInputWithTitlePresenter } from './TemplatedInputWithTitlePresenter';

const TBD = '개발중';

/**
 * @TODO
 * TODO: 현재 컴포넌트 짜는 로직을 추가하지 않은 시점에서 작업을 하려니, 막상 사이즈를 구하는 로직에서 어떻게 사이즈를 정의해줄지를 정의할 수 없다는 것을 깨달았다.
 * 예컨대 `useRef`를 써서 해결할 수도 있을 것 같기도 하고, 마우스 이벤트마다 특정 시점을 변경시켜서 컴포넌트의 position, size 값을 set할 수도 있을 것 같다.
 * 이는 추후 명세가 확정되면 구체화한다.
 */
/* eslint-disable no-console */
export function ActivedGroupPositionSizeModifier() {
  const { activedBlockGroup } = useBlockGroupsAtom();

  const theme = useTheme();

  if (activedBlockGroup === null || activedBlockGroup.type !== 'group') return <div></div>;

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

        {/* TODO: 추후 group에 대한 사이즈 조절을 구현하고, focus, blur 이벤트 처리를 해야한다. */}
        <DefaultHStack paddingBottom="8px" justifyContent="space-between">
          <TemplatedInputWithTitlePresenter
            direction="horizontal"
            title="위쪽"
            placeholder="입력"
            value={TBD}
            onChange={() => {
              // eslint-disable-next-line
              console.log(TBD);
            }}
            onFocus={() => {
              return;
            }}
            onBlur={() => {
              return;
            }}
          />

          <TemplatedInputWithTitlePresenter
            direction="horizontal"
            title="왼쪽"
            placeholder="입력"
            value={TBD}
            onChange={() => {
              // eslint-disable-next-line
              console.log(TBD);
            }}
            onFocus={() => {
              return;
            }}
            onBlur={() => {
              return;
            }}
          />
        </DefaultHStack>

        <DefaultHStack justifyContent="space-between">
          <TemplatedInputWithTitlePresenter
            direction="horizontal"
            title="너비"
            placeholder="입력"
            value={TBD}
            onChange={() => {
              // eslint-disable-next-line
              console.log(TBD);
            }}
            onFocus={() => {
              return;
            }}
            onBlur={() => {
              return;
            }}
          />

          <TemplatedInputWithTitlePresenter
            direction="horizontal"
            title="높이"
            placeholder="입력"
            value={TBD}
            onChange={() => {
              // eslint-disable-next-line
              console.log(TBD);
            }}
            onFocus={() => {
              return;
            }}
            onBlur={() => {
              return;
            }}
          />
        </DefaultHStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor="white" />
    </>
  );
}
