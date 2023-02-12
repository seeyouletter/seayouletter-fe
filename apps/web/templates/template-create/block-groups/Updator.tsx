import React, { useEffect, useState } from 'react';

import { useTheme } from '@emotion/react';

import { useBlockGroupsAtom } from '@hooks/useBlockGroupsAtom';
import { useResizablePageAtom } from '@hooks/useResizablePageAtom';
import { useTemplateTaskHistories } from '@hooks/useTemplateTaskHistories';

import { convertPxStringToNumber } from '@utils/index';

import { DefaultBox, Directions, EdgeDirections } from 'ui';

import { NodeItemPropsInterface } from './types';

interface LineInterface {
  onMouseDown: () => void;
  onMouseUp: () => void;
}
Updator.Top = function UpdatorTopLine({ onMouseDown, onMouseUp }: LineInterface) {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="ns-resize"
      position="absolute"
      zIndex={9999}
      left="0"
      top="-1px"
      width="100%"
      height="2px"
      background={theme.color.primary[200]}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};

Updator.Right = function UpdatorRightLine() {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="ew-resize"
      position="absolute"
      zIndex={9999}
      left="100%"
      top="0"
      width="2px"
      height="100%"
      background={theme.color.primary[200]}
    />
  );
};

Updator.Bottom = function UpdatorLeftLine({ onMouseDown, onMouseUp }: LineInterface) {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="ns-resize"
      position="absolute"
      zIndex={9999}
      left="-1px"
      top="100%"
      width="100%"
      height="2px"
      background={theme.color.primary[200]}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};

Updator.Left = function UpdatorBototmLine() {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="ew-resize"
      position="absolute"
      zIndex={9999}
      left="-1px"
      top="0"
      width="2px"
      height="100%"
      background={theme.color.primary[200]}
    />
  );
};

Updator.TopLeftEdge = function UpdatorLeftTopEdge() {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="nwse-resize"
      position="absolute"
      zIndex={10000}
      left="-3px"
      top="-3px"
      width="6px"
      height="6px"
      background={theme.color.white}
      border={theme.border.primaryLight}
    />
  );
};

Updator.TopRightEdge = function TopRightEdge() {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="nesw-resize"
      position="absolute"
      zIndex={10000}
      left="calc(100% - 3px)"
      top="-3px"
      width="6px"
      height="6px"
      background={theme.color.white}
      border={theme.border.primaryLight}
    />
  );
};

Updator.BottomRightEdge = function UpdatorBottomRightEdge() {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="nwse-resize"
      position="absolute"
      zIndex={10000}
      left="calc(100% - 3px)"
      top="calc(100% - 3px)"
      width="6px"
      height="6px"
      background={theme.color.white}
      border={theme.border.primaryLight}
    />
  );
};

Updator.BottomLeftEdge = function UpdatorBottomLeftEdge() {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="nesw-resize"
      position="absolute"
      zIndex={10000}
      left="-3px"
      top="calc(100% - 3px)"
      width="6px"
      height="6px"
      background={theme.color.white}
      border={theme.border.primaryLight}
    />
  );
};

export function Updator({ item }: NodeItemPropsInterface) {
  const { activedBlockGroup, changeBlockState } = useBlockGroupsAtom();
  const { pageState } = useResizablePageAtom();

  const { addTask } = useTemplateTaskHistories();

  const [isMousePressing, setIsMousePressing] = useState(false);
  const [nowUpdate, setNowUpdate] = useState<EdgeDirections | Directions | null>(null);
  const [isUpdating, setIsUpdating] = useState({
    top: false,
    right: false,
    bottom: false,
    left: false,
    topLeft: false,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
  });

  const onMouseDown = (direction: EdgeDirections | Directions) => {
    if (isMousePressing || isUpdating[direction]) return;

    setIsMousePressing(() => true);
    setNowUpdate(() => direction);
    setIsUpdating((state) => ({ ...state, [direction]: true }));
  };

  const onMouseUp = (direction: EdgeDirections | Directions | null) => {
    if (!isMousePressing || !direction || !isUpdating[direction]) return;

    addTask({
      taskType: 'update',
      before: item,
      after: activedBlockGroup,
    });

    setIsMousePressing(() => false);
    setIsUpdating((state) => ({ ...state, [direction]: false }));
    setNowUpdate(() => null);
  };

  useEffect(() => {
    const lineTopMouseMoveHandler = (e: MouseEvent) => {
      if (activedBlockGroup === null || activedBlockGroup.type === 'group') return;
      if (!isUpdating.top) return;

      const { clientY } = e;

      const activedBlockTop = convertPxStringToNumber(activedBlockGroup.style.position.top);
      const activedBlockHeight = convertPxStringToNumber(activedBlockGroup.style.size.height);
      const activedBlockBottom = activedBlockTop + activedBlockHeight;

      const nextTop = clientY - +pageState.top + pageState.scrollY;
      const nextHeight = activedBlockHeight + activedBlockTop - nextTop;

      const isReversed = nextTop > activedBlockBottom;

      const nextPosition = {
        ...activedBlockGroup.style.position,
        top: (isReversed ? activedBlockBottom : nextTop) + 'px',
      };

      const nextSize = {
        ...activedBlockGroup.style.size,
        height: (isReversed ? nextTop - activedBlockBottom : nextHeight) + 'px',
      };

      if (activedBlockGroup.subType !== 'text') {
        const nextState = {
          ...activedBlockGroup,
          style: {
            ...activedBlockGroup.style,
            size: nextSize,
            position: nextPosition,
          },
        };

        changeBlockState(nextState);
      } else {
        const nextState = {
          ...activedBlockGroup,
          style: {
            ...activedBlockGroup.style,
            size: nextSize,
            position: nextPosition,
          },
        };

        changeBlockState(nextState);
      }
    };

    window.addEventListener('mousemove', lineTopMouseMoveHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', lineTopMouseMoveHandler);
    };

    /* eslint-disable-next-line */
  }, [isUpdating]);

  useEffect(() => {
    const lineBottomMouseMoveHandler = (e: MouseEvent) => {
      if (activedBlockGroup === null || activedBlockGroup.type === 'group') return;
      if (!isUpdating.bottom) return;

      const { clientY } = e;

      const activedBlockTop = convertPxStringToNumber(activedBlockGroup.style.position.top);

      const nextHeight = clientY + pageState.scrollY - +pageState.top - activedBlockTop;

      const isReversed = nextHeight < 0;

      const nextPosition = {
        ...activedBlockGroup.style.position,
        top: (isReversed ? activedBlockTop + nextHeight : activedBlockTop) + 'px',
      };

      const nextSize = {
        ...activedBlockGroup.style.size,
        height: (isReversed ? -1 : 1) * nextHeight + 'px',
      };

      if (activedBlockGroup.subType !== 'text') {
        const nextState = {
          ...activedBlockGroup,
          style: {
            ...activedBlockGroup.style,
            size: nextSize,
            position: nextPosition,
          },
        };

        changeBlockState(nextState);
      } else {
        const nextState = {
          ...activedBlockGroup,
          style: {
            ...activedBlockGroup.style,
            size: nextSize,
            position: nextPosition,
          },
        };

        changeBlockState(nextState);
      }
    };

    window.addEventListener('mousemove', lineBottomMouseMoveHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', lineBottomMouseMoveHandler);
    };

    /* eslint-disable-next-line */
  }, [isUpdating]);

  return (
    <>
      <Updator.Top onMouseDown={() => onMouseDown('top')} onMouseUp={() => onMouseUp(nowUpdate)} />
      <Updator.Right />
      <Updator.Bottom
        onMouseDown={() => onMouseDown('bottom')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />
      <Updator.Left />

      <Updator.TopLeftEdge />
      <Updator.TopRightEdge />
      <Updator.BottomRightEdge />
      <Updator.BottomLeftEdge />
    </>
  );
}
