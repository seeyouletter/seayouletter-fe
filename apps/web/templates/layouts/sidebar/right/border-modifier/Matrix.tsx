import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useTheme } from '@emotion/react';

import { concurrentlyActivedSections } from '@atoms/blockBorderAtom';

import { useBorderMatrix } from '@hooks/index';

import {
  DefaultBox,
  DefaultHStack,
  DefaultText,
  DefaultVStack,
  DirectionsConstants,
  EdgeDirectionsConstants,
  StrongText,
} from 'ui';

interface SubMatrixCommonPropsInterface {
  onMouseOverMatrix: (key: EdgeDirectionsConstants | DirectionsConstants | 'all') => void;
  onClickBorderSection: ({
    key,
  }: {
    key: EdgeDirectionsConstants | DirectionsConstants | 'all';
  }) => void;
  onBlurMatrix: () => void;
}

interface LineMatrixPropsInterface extends SubMatrixCommonPropsInterface {
  direction: 'vertical' | 'horizontal';
  actived: boolean;
  position: DirectionsConstants;
}

interface EdgeMatrixPropsInterface extends SubMatrixCommonPropsInterface {
  actived: boolean;
  position: EdgeDirectionsConstants;
}

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
      onMouseOver={() => onMouseOverMatrix(EdgeDirectionsConstants[position])}
      onMouseLeave={onBlurMatrix}
      onClick={() => onClickBorderSection({ key: EdgeDirectionsConstants[position] })}
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
      onMouseOver={() => onMouseOverMatrix(DirectionsConstants[position])}
      onMouseLeave={onBlurMatrix}
      onClick={() => onClickBorderSection({ key: DirectionsConstants[position] })}
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

  const onMouseOverMatrix = (key: EdgeDirectionsConstants | DirectionsConstants | 'all') => {
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
            actived={activedState[EdgeDirectionsConstants.topLeft]}
            position={EdgeDirectionsConstants.topLeft}
            onMouseOverMatrix={onMouseOverMatrix}
            onBlurMatrix={onBlurMatrix}
            onClickBorderSection={onClickBorderSection}
          />

          <LineMatrix
            direction="horizontal"
            actived={activedState[DirectionsConstants.top]}
            position={DirectionsConstants.top}
            onMouseOverMatrix={onMouseOverMatrix}
            onBlurMatrix={onBlurMatrix}
            onClickBorderSection={onClickBorderSection}
          />

          <EdgeMatrix
            actived={activedState[EdgeDirectionsConstants.topRight]}
            position={EdgeDirectionsConstants.topRight}
            onMouseOverMatrix={onMouseOverMatrix}
            onBlurMatrix={onBlurMatrix}
            onClickBorderSection={onClickBorderSection}
          />
        </DefaultHStack>

        <DefaultHStack>
          <LineMatrix
            direction="vertical"
            actived={activedState[DirectionsConstants.left]}
            position={DirectionsConstants.left}
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
            actived={activedState[DirectionsConstants.right]}
            position={DirectionsConstants.right}
            onMouseOverMatrix={onMouseOverMatrix}
            onBlurMatrix={onBlurMatrix}
            onClickBorderSection={onClickBorderSection}
          />
        </DefaultHStack>

        <DefaultHStack>
          <EdgeMatrix
            actived={activedState[EdgeDirectionsConstants.bottomLeft]}
            position={EdgeDirectionsConstants.bottomLeft}
            onMouseOverMatrix={onMouseOverMatrix}
            onBlurMatrix={onBlurMatrix}
            onClickBorderSection={onClickBorderSection}
          />

          <LineMatrix
            direction="horizontal"
            actived={activedState[DirectionsConstants.bottom]}
            position={DirectionsConstants.bottom}
            onMouseOverMatrix={onMouseOverMatrix}
            onBlurMatrix={onBlurMatrix}
            onClickBorderSection={onClickBorderSection}
          />

          <EdgeMatrix
            actived={activedState[EdgeDirectionsConstants.bottomRight]}
            position={EdgeDirectionsConstants.bottomRight}
            onMouseOverMatrix={onMouseOverMatrix}
            onBlurMatrix={onBlurMatrix}
            onClickBorderSection={onClickBorderSection}
          />
        </DefaultHStack>
      </DefaultVStack>
    </DefaultVStack>
  );
}
