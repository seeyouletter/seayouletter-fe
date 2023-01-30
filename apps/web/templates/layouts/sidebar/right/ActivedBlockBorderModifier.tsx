import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useTheme } from '@emotion/react';

import {
  DefaultBox,
  DefaultDivider,
  DefaultHStack,
  DefaultText,
  DefaultVStack,
  StrongText,
} from 'ui';

import {
  DirectionsContstants,
  EdgeDirectionsContstants,
  concurrentlyActivedSections,
} from '@atoms/blockBorderAtom';

import { useBorderMatrix, useBorderModifier } from '@hooks/index';

import { TemplatedColorInputWithTitlePresenter } from './TemplatedColorInputWithTitle';
import { TemplatedInputWithTitlePresenter } from './TemplatedInputWithTitlePresenter';

const initialmatrixState = {
  topLeft: false,
  top: false,
  topRight: false,
  left: false,
  right: false,
  bottomLeft: false,
  bottom: false,
  bottomRight: false,
};

interface SubMatrixCommonPropsInterface {
  onMouseOverMatrix: (key: EdgeDirectionsContstants | DirectionsContstants | 'all') => void;
  onClickBorderSection: ({
    key,
  }: {
    key: EdgeDirectionsContstants | DirectionsContstants | 'all';
  }) => void;
  onBlurMatrix: () => void;
}

interface LineMatrixPropsInterface extends SubMatrixCommonPropsInterface {
  direction: 'vertical' | 'horizontal';
  actived: boolean;
  position: DirectionsContstants;
}

interface EdgeMatrixPropsInterface extends SubMatrixCommonPropsInterface {
  actived: boolean;
  position: EdgeDirectionsContstants;
}

const EdgeMatrix = ({
  actived,
  position,
  onMouseOverMatrix,
  onClickBorderSection,
  onBlurMatrix,
}: EdgeMatrixPropsInterface) => {
  const theme = useTheme();

  return (
    <DefaultBox
      border="0.5px solid white"
      width="20px"
      height="20px"
      backgroundColor={actived ? theme.color.primary[500] : theme.color.transparent}
      transition="all 0.2s"
      cursor="pointer"
      onMouseOver={() => onMouseOverMatrix(EdgeDirectionsContstants[position])}
      onMouseLeave={onBlurMatrix}
      onClick={() => onClickBorderSection({ key: EdgeDirectionsContstants[position] })}
    />
  );
};

const LineMatrix = ({
  direction,
  actived,
  position,
  onMouseOverMatrix,
  onClickBorderSection,
  onBlurMatrix,
}: LineMatrixPropsInterface) => {
  const theme = useTheme();

  const BorderName = {
    top: '상',
    bottom: '하',
    left: '좌',
    right: '우',
  };

  return (
    <DefaultBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      border="0.5px solid white"
      width={direction === 'vertical' ? '20px' : '32px'}
      height={direction === 'vertical' ? '32px' : '20px'}
      backgroundColor={actived ? theme.color.primary[500] : theme.color.transparent}
      transition="all 0.2s"
      cursor="pointer"
      onMouseOver={() => onMouseOverMatrix(DirectionsContstants[position])}
      onMouseLeave={onBlurMatrix}
      onClick={() => onClickBorderSection({ key: DirectionsContstants[position] })}
    >
      <DefaultText textAlign="center" size={theme.fontSize.xs} color={theme.color.white}>
        {BorderName[position]}
      </DefaultText>
    </DefaultBox>
  );
};

export function BorderMatrix() {
  const theme = useTheme();
  const { blockBorderState, onClickBorderSection } = useBorderMatrix();

  const [activedState, setActivedState] = useState(initialmatrixState);

  const activedAll = useMemo(() => {
    return Object.values(activedState).every((v) => v);
  }, [activedState]);

  const setActiveSections = useCallback(() => {
    const nextState = { ...initialmatrixState };

    blockBorderState.concurrentlyActivedSection.forEach((section) => {
      nextState[section] = true;
    });

    setActivedState(() => nextState);
  }, [blockBorderState]);

  useEffect(() => {
    setActiveSections();
  }, [setActiveSections]);

  const onMouseOverMatrix = (key: EdgeDirectionsContstants | DirectionsContstants | 'all') => {
    const nextState = { ...initialmatrixState };

    const concurrencies = concurrentlyActivedSections[key];

    concurrencies.forEach((concurrent) => (nextState[concurrent] = true));

    setActivedState(() => nextState);
  };

  const onBlurMatrix = () => {
    setActiveSections();
  };

  return (
    <DefaultVStack spacing={1} id="테두리">
      <DefaultBox width="72px">
        <StrongText size={theme.fontSize.xs} color="white">
          테두리
        </StrongText>
      </DefaultBox>

      <DefaultVStack>
        <DefaultHStack>
          <EdgeMatrix
            actived={activedState[EdgeDirectionsContstants.topLeft]}
            position={EdgeDirectionsContstants.topLeft}
            onMouseOverMatrix={onMouseOverMatrix}
            onBlurMatrix={onBlurMatrix}
            onClickBorderSection={onClickBorderSection}
          />

          <LineMatrix
            direction="horizontal"
            actived={activedState[DirectionsContstants.top]}
            position={DirectionsContstants.top}
            onMouseOverMatrix={onMouseOverMatrix}
            onBlurMatrix={onBlurMatrix}
            onClickBorderSection={onClickBorderSection}
          />

          <EdgeMatrix
            actived={activedState[EdgeDirectionsContstants.topRight]}
            position={EdgeDirectionsContstants.topRight}
            onMouseOverMatrix={onMouseOverMatrix}
            onBlurMatrix={onBlurMatrix}
            onClickBorderSection={onClickBorderSection}
          />
        </DefaultHStack>

        <DefaultHStack>
          <LineMatrix
            direction="vertical"
            actived={activedState[DirectionsContstants.left]}
            position={DirectionsContstants.left}
            onMouseOverMatrix={onMouseOverMatrix}
            onBlurMatrix={onBlurMatrix}
            onClickBorderSection={onClickBorderSection}
          />

          <DefaultBox
            border="0.5px solid white"
            width="32px"
            height="32px"
            backgroundColor={activedAll ? theme.color.primary[500] : theme.color.transparent}
            onMouseOver={() => onMouseOverMatrix('all')}
            onMouseLeave={onBlurMatrix}
            onClick={() => onClickBorderSection({ key: 'all' })}
          />

          <LineMatrix
            direction="vertical"
            actived={activedState[DirectionsContstants.right]}
            position={DirectionsContstants.right}
            onMouseOverMatrix={onMouseOverMatrix}
            onBlurMatrix={onBlurMatrix}
            onClickBorderSection={onClickBorderSection}
          />
        </DefaultHStack>

        <DefaultHStack>
          <EdgeMatrix
            actived={activedState[EdgeDirectionsContstants.bottomLeft]}
            position={EdgeDirectionsContstants.bottomLeft}
            onMouseOverMatrix={onMouseOverMatrix}
            onBlurMatrix={onBlurMatrix}
            onClickBorderSection={onClickBorderSection}
          />

          <LineMatrix
            direction="horizontal"
            actived={activedState[DirectionsContstants.bottom]}
            position={DirectionsContstants.bottom}
            onMouseOverMatrix={onMouseOverMatrix}
            onBlurMatrix={onBlurMatrix}
            onClickBorderSection={onClickBorderSection}
          />

          <EdgeMatrix
            actived={activedState[EdgeDirectionsContstants.bottomRight]}
            position={EdgeDirectionsContstants.bottomRight}
            onMouseOverMatrix={onMouseOverMatrix}
            onBlurMatrix={onBlurMatrix}
            onClickBorderSection={onClickBorderSection}
          />
        </DefaultHStack>
      </DefaultVStack>
    </DefaultVStack>
  );
}

/**
 * @description
 * INFO: 보더를 설정함에 있어 모서리일 경우랑 선의 경우를 다르게 인터페이스를 가져갈 필요가 있었다.
 * 이를 좀 더 유연하게 설계하기 위해 팩토리 메서드 패턴을 사용했다.
 */
export function BorderSemiModifierFactory() {
  const { blockBorderState } = useBorderMatrix();

  return blockBorderState.activeBorder in EdgeDirectionsContstants ? (
    <EdgeModifier />
  ) : (
    <LineModifier />
  );
}

export function EdgeModifier() {
  const { activeSectionBorderRadius, setBorderRadiusMiddleWare } = useBorderModifier();

  return (
    <DefaultVStack spacing={2} paddingTop="4px">
      <DefaultHStack spacing={2}>
        <TemplatedInputWithTitlePresenter
          direction="vertical"
          inputWidth="42px"
          title="둥글기"
          placeholder="입력"
          value={activeSectionBorderRadius()}
          onChange={setBorderRadiusMiddleWare}
        />
      </DefaultHStack>
    </DefaultVStack>
  );
}

export function LineModifier() {
  const {
    activeSectionBorderColor,
    activeSectionBorderOpacity,
    activeSectionBorderRadius,
    activeSectionBorderStyle,
    activeSectionBorderWidth,
    setBorderMiddleware,
    setBorderRadiusMiddleWare,
  } = useBorderModifier();
  return (
    <DefaultVStack spacing={2} paddingTop="4px">
      <DefaultHStack spacing={2}>
        <TemplatedInputWithTitlePresenter
          direction="vertical"
          inputWidth="42px"
          title="두께"
          placeholder="입력"
          value={activeSectionBorderWidth()}
          onChange={(e) => setBorderMiddleware(e, 'width')}
        />

        <TemplatedInputWithTitlePresenter
          direction="vertical"
          inputWidth="42px"
          title="둥글기"
          placeholder="입력"
          value={activeSectionBorderRadius()}
          onChange={setBorderRadiusMiddleWare}
        />

        <TemplatedInputWithTitlePresenter
          direction="vertical"
          inputWidth="48px"
          title="스타일"
          placeholder="입력"
          value={activeSectionBorderStyle()}
          onChange={(e) => setBorderMiddleware(e, 'style')}
        />
      </DefaultHStack>

      <DefaultHStack spacing={2}>
        <TemplatedColorInputWithTitlePresenter
          direction="vertical"
          width="24px"
          title="색상"
          value={activeSectionBorderColor()}
          onChange={(e) => setBorderMiddleware(e, 'color')}
        />

        <TemplatedInputWithTitlePresenter
          direction="vertical"
          inputWidth="60px"
          title="색상번호"
          placeholder="입력"
          value={activeSectionBorderColor()}
          onChange={(e) => setBorderMiddleware(e, 'color')}
        />

        <TemplatedInputWithTitlePresenter
          direction="vertical"
          inputWidth="48px"
          title="투명도"
          placeholder="입력"
          value={activeSectionBorderOpacity()}
          onChange={(e) => setBorderMiddleware(e, 'opacity')}
        />
      </DefaultHStack>
    </DefaultVStack>
  );
}

/* eslint-disable no-console */
export function ActivedBlockBorderModifier() {
  const theme = useTheme();
  const { blockBorderState } = useBorderMatrix();

  return (
    <>
      <DefaultVStack spacing={4}>
        <StrongText size={theme.fontSize.sm} color="white">
          블록 테두리({blockBorderState.name})
        </StrongText>

        <DefaultHStack spacing={2}>
          <BorderMatrix />

          <BorderSemiModifierFactory />
        </DefaultHStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor="white" />
    </>
  );
}
