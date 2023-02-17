import React, { MouseEvent as ReactMouseEvent, useEffect, useState } from 'react';

import { useTheme } from '@emotion/react';

import { useBlockGroupsAtom, useResizablePageAtom, useTemplateTaskHistories } from '@hooks/index';

import { convertPxStringToNumber } from '@utils/index';

import {
  Blocks,
  DefaultBox,
  Directions,
  EdgeDirections,
  GroupBlockSize,
  NonTextBlock,
  Position,
  TextBlock,
} from 'ui';

import { NodeItemPropsInterface } from './types';

interface LineInterface {
  onMouseDown: (e: ReactMouseEvent) => void;
  onMouseUp: () => void;
}

interface EdgeInterface {
  onMouseDown: (e: ReactMouseEvent) => void;
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
      onMouseDownCapture={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};

Updator.Right = function UpdatorRightLine({ onMouseDown, onMouseUp }: LineInterface) {
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
      onMouseDownCapture={onMouseDown}
      onMouseUp={onMouseUp}
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
      onMouseDownCapture={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};

Updator.Left = function UpdatorBototmLine({ onMouseDown, onMouseUp }: LineInterface) {
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
      onMouseDownCapture={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};

Updator.TopLeftEdge = function UpdatorLeftTopEdge({ onMouseDown, onMouseUp }: EdgeInterface) {
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
      onMouseDownCapture={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};

Updator.TopRightEdge = function TopRightEdge({ onMouseDown, onMouseUp }: EdgeInterface) {
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
      onMouseDownCapture={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};

Updator.BottomRightEdge = function UpdatorBottomRightEdge({
  onMouseDown,
  onMouseUp,
}: EdgeInterface) {
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
      onMouseDownCapture={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};

Updator.BottomLeftEdge = function UpdatorBottomLeftEdge({ onMouseDown, onMouseUp }: EdgeInterface) {
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
      onMouseDownCapture={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};

export function Updator({ item }: { item: NodeItemPropsInterface['item'] }) {
  const { activedBlockGroup, changeBlockState } = useBlockGroupsAtom();
  const { pageState } = useResizablePageAtom();

  const { addTask } = useTemplateTaskHistories();

  const [isMousePressing, setIsMousePressing] = useState(false);
  const [nowUpdate, setNowUpdate] = useState<EdgeDirections | Directions | null>(null);

  const [blockSnapshot, setBlockSnapshot] = useState<Blocks | null>(null);

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

  const initializeBlockSnapshot = () => {
    setBlockSnapshot(() => null);
  };

  const onMouseDown = (e: ReactMouseEvent, direction: EdgeDirections | Directions) => {
    e.stopPropagation();

    if (activedBlockGroup?.type === 'group' || isMousePressing || isUpdating[direction]) return;

    setIsMousePressing(() => true);
    setBlockSnapshot(() => activedBlockGroup);
    setIsUpdating((state) => ({ ...state, [direction]: true }));
    setNowUpdate(() => direction);
  };

  const onMouseUp = (direction: EdgeDirections | Directions | null) => {
    if (!isMousePressing || !direction || !isUpdating[direction]) return;

    addTask({
      taskType: 'update',
      before: item,
      after: activedBlockGroup,
    });

    setIsMousePressing(() => false);
    initializeBlockSnapshot();
    setIsUpdating((state) => ({ ...state, [direction]: false }));
    setNowUpdate(() => null);
  };

  const getActiveBlockNextState = ({
    block,
    nextSize = {},
    nextPosition = {},
  }: {
    block: Blocks;
    nextSize: Partial<GroupBlockSize>;
    nextPosition: Partial<Position>;
  }) => {
    return {
      ...block,
      style: {
        ...block.style,
        size: {
          ...block.style.size,
          ...nextSize,
        },
        position: {
          ...block.style.position,
          ...nextPosition,
        },
      },
    };
  };

  const getNextFromTop = (y: number): { nextTop: number; nextBottom: number } => {
    if (blockSnapshot?.type !== 'block') {
      return {
        nextTop: 0,
        nextBottom: 0,
      };
    }

    const initialBlockTop = convertPxStringToNumber(blockSnapshot.style.position.top);
    const initialBlockHeight = convertPxStringToNumber(blockSnapshot.style.size.height);

    const nextTop = y - +pageState.top + pageState.scrollY;
    const nextBottom = initialBlockHeight + initialBlockTop;

    const isReversed = nextTop > nextBottom;

    return {
      nextTop: isReversed ? nextBottom : nextTop,
      nextBottom: isReversed ? nextTop : nextBottom,
    };
  };

  const getNextFromRight = (x: number): { nextLeft: number; nextRight: number } => {
    if (blockSnapshot?.type !== 'block') {
      return {
        nextLeft: 0,
        nextRight: 0,
      };
    }

    const initialBlockLeft = convertPxStringToNumber(blockSnapshot.style.position.left);
    const nowRight = x - +pageState.left;

    const isReversed = nowRight < initialBlockLeft;

    return {
      nextLeft: isReversed ? nowRight : initialBlockLeft,
      nextRight: isReversed ? initialBlockLeft : nowRight,
    };
  };

  const getNextFromBottom = (y: number): { nextTop: number; nextBottom: number } => {
    if (blockSnapshot?.type !== 'block') {
      return {
        nextTop: 0,
        nextBottom: 0,
      };
    }

    const nextTop = convertPxStringToNumber(blockSnapshot.style.position.top);

    const nextBottom = y + pageState.scrollY - +pageState.top;

    const isReversed = nextBottom < nextTop;

    return {
      nextTop: isReversed ? nextBottom : nextTop,
      nextBottom: isReversed ? nextTop : nextBottom,
    };
  };

  const getNextFromLeft = (x: number): { nextLeft: number; nextRight: number } => {
    if (blockSnapshot?.type !== 'block') {
      return {
        nextLeft: 0,
        nextRight: 0,
      };
    }

    const activedBlockLeft = convertPxStringToNumber(blockSnapshot.style.position.left);
    const activedBlockWidth = convertPxStringToNumber(blockSnapshot.style.size.width);
    const activedRightLineFromLeft = activedBlockWidth + activedBlockLeft;

    const nowLeft = x - +pageState.left;

    const isReversed = nowLeft > activedRightLineFromLeft;

    return {
      nextLeft: isReversed ? activedRightLineFromLeft : nowLeft,
      nextRight: isReversed ? nowLeft : activedRightLineFromLeft,
    };
  };

  useEffect(() => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return;
    if (!isUpdating.top) return;

    const lineTopMouseMoveHandler = (e: MouseEvent) => {
      const { nextTop, nextBottom } = getNextFromTop(e.clientY);
      const nextHeight = nextBottom - nextTop;

      const nextState = getActiveBlockNextState({
        block: activedBlockGroup,
        nextSize: { height: nextHeight + 'px' },
        nextPosition: { top: nextTop + 'px' },
      });

      if (activedBlockGroup.subType !== 'text') {
        changeBlockState(nextState as TextBlock);
      } else {
        changeBlockState(nextState as NonTextBlock);
      }
    };

    window.addEventListener('mousemove', lineTopMouseMoveHandler);

    return () => {
      window.removeEventListener('mousemove', lineTopMouseMoveHandler);
    };

    /* eslint-disable-next-line */
  }, [isUpdating, getNextFromRight]);

  useEffect(() => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return;
    if (!isUpdating.bottom) return;

    const lineBottomMouseMoveHandler = (e: MouseEvent) => {
      const { nextTop, nextBottom } = getNextFromBottom(e.clientY);

      const nextState = getActiveBlockNextState({
        block: activedBlockGroup,
        nextSize: { height: nextBottom - nextTop + 'px' },
        nextPosition: { top: nextTop + 'px' },
      });

      if (activedBlockGroup.subType !== 'text') {
        changeBlockState(nextState as TextBlock);
      } else {
        changeBlockState(nextState as NonTextBlock);
      }
    };

    window.addEventListener('mousemove', lineBottomMouseMoveHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', lineBottomMouseMoveHandler);
    };

    /* eslint-disable-next-line */
  }, [isUpdating, getNextFromBottom]);

  useEffect(() => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return;
    if (!isUpdating.left) return;

    const lineLeftMouseMoveHandler = (e: MouseEvent) => {
      const { nextLeft, nextRight } = getNextFromLeft(e.clientX);

      const nextWidth = nextRight - nextLeft;

      const nextState = getActiveBlockNextState({
        block: activedBlockGroup,
        nextSize: { width: nextWidth + 'px' },
        nextPosition: { left: nextLeft + 'px' },
      });

      if (activedBlockGroup.subType !== 'text') {
        changeBlockState(nextState as TextBlock);
      } else {
        changeBlockState(nextState as NonTextBlock);
      }
    };

    window.addEventListener('mousemove', lineLeftMouseMoveHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', lineLeftMouseMoveHandler);
    };

    /* eslint-disable-next-line */
  }, [isUpdating, getNextFromLeft]);

  useEffect(() => {
    if (activedBlockGroup === null || activedBlockGroup.type === 'group') return;
    if (!isUpdating.right) return;

    const lineRightMouseMoveHandler = (e: MouseEvent) => {
      /**
       * @inner
       * useMouseStateAtom으로 하지 않는 이유는, 현재 이벤트에서 가져오는 값이 훨씬 속도가 빠르기 때문이다.
       * throttle을 제거하더라도, mouseMove의 변수를 가져오는 속도는 생각보다 느리다.
       * 전역 상태의 값을 찾아야 하기 때문이다.
       *
       * 반면 해당 작업은 유저가 세밀하게 작업하기 때문에 속도에 대한 역치가 상당히 낮다.
       * 따라서 어쩔 수 없이 리플로우를 유발하더라도 사용한다.
       */
      const { nextLeft, nextRight } = getNextFromRight(e.clientX);
      const nextWidth = nextRight - nextLeft;

      const nextState = getActiveBlockNextState({
        block: activedBlockGroup,
        nextSize: { width: nextWidth + 'px' },
        nextPosition: { left: nextLeft + 'px' },
      });

      if (activedBlockGroup.subType !== 'text') {
        changeBlockState(nextState as TextBlock);
      } else {
        changeBlockState(nextState as NonTextBlock);
      }
    };

    window.addEventListener('mousemove', lineRightMouseMoveHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', lineRightMouseMoveHandler);
    };

    /* eslint-disable-next-line */
  }, [isUpdating, getNextFromRight]);

  useEffect(() => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return;
    if (!isUpdating.topLeft) return;

    const edgesTopLeftMouseMoveHandler = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      const { nextTop, nextBottom } = getNextFromTop(clientY);
      const { nextLeft, nextRight } = getNextFromLeft(clientX);

      const nextWidth = nextRight - nextLeft;
      const nextHeight = nextBottom - nextTop;

      const nextState = getActiveBlockNextState({
        block: activedBlockGroup,
        nextSize: { width: nextWidth + 'px', height: nextHeight + 'px' },
        nextPosition: { left: nextLeft + 'px', top: nextTop + 'px' },
      });

      if (activedBlockGroup.subType !== 'text') {
        changeBlockState(nextState as TextBlock);
      } else {
        changeBlockState(nextState as NonTextBlock);
      }
    };

    window.addEventListener('mousemove', edgesTopLeftMouseMoveHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', edgesTopLeftMouseMoveHandler);
    };

    /* eslint-disable-next-line */
  }, [isUpdating]);

  useEffect(() => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return;
    if (!isUpdating.topRight) return;

    const edgeTopRightMouseMoveHandler = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      const { nextTop, nextBottom } = getNextFromTop(clientY);
      const { nextLeft, nextRight } = getNextFromRight(clientX);

      const nextWidth = nextRight - nextLeft;
      const nextHeight = nextBottom - nextTop;

      const nextState = getActiveBlockNextState({
        block: activedBlockGroup,
        nextSize: { width: nextWidth + 'px', height: nextHeight + 'px' },
        nextPosition: { left: nextLeft + 'px', top: nextTop + 'px' },
      });

      if (activedBlockGroup.subType !== 'text') {
        changeBlockState(nextState as TextBlock);
      } else {
        changeBlockState(nextState as NonTextBlock);
      }
    };

    window.addEventListener('mousemove', edgeTopRightMouseMoveHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', edgeTopRightMouseMoveHandler);
    };

    /* eslint-disable-next-line */
  }, [isUpdating]);

  useEffect(() => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return;
    if (!isUpdating.bottomRight) return;

    const edgeBottomRightMouseMoveHandler = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      const { nextTop, nextBottom } = getNextFromBottom(clientY);
      const { nextLeft, nextRight } = getNextFromRight(clientX);

      const nextWidth = nextRight - nextLeft;
      const nextHeight = nextBottom - nextTop;

      const nextState = getActiveBlockNextState({
        block: activedBlockGroup,
        nextSize: { width: nextWidth + 'px', height: nextHeight + 'px' },
        nextPosition: { left: nextLeft + 'px', top: nextTop + 'px' },
      });

      if (activedBlockGroup.subType !== 'text') {
        changeBlockState(nextState as TextBlock);
      } else {
        changeBlockState(nextState as NonTextBlock);
      }
    };

    window.addEventListener('mousemove', edgeBottomRightMouseMoveHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', edgeBottomRightMouseMoveHandler);
    };

    /* eslint-disable-next-line */
  }, [isUpdating]);

  useEffect(() => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return;
    if (!isUpdating.bottomLeft) return;

    const edgesBottomLeftMouseMoveHandler = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      const { nextTop, nextBottom } = getNextFromBottom(clientY);
      const { nextLeft, nextRight } = getNextFromLeft(clientX);

      const nextWidth = nextRight - nextLeft;
      const nextHeight = nextBottom - nextTop;

      const nextState = getActiveBlockNextState({
        block: activedBlockGroup,
        nextSize: { width: nextWidth + 'px', height: nextHeight + 'px' },
        nextPosition: { left: nextLeft + 'px', top: nextTop + 'px' },
      });

      if (activedBlockGroup.subType !== 'text') {
        changeBlockState(nextState as TextBlock);
      } else {
        changeBlockState(nextState as NonTextBlock);
      }
    };

    window.addEventListener('mousemove', edgesBottomLeftMouseMoveHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', edgesBottomLeftMouseMoveHandler);
    };

    /* eslint-disable-next-line */
  }, [isUpdating]);

  return (
    <>
      <Updator.Top
        onMouseDown={(e) => onMouseDown(e, 'top')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />

      <Updator.Right
        onMouseDown={(e) => onMouseDown(e, 'right')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />

      <Updator.Bottom
        onMouseDown={(e) => onMouseDown(e, 'bottom')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />

      <Updator.Left
        onMouseDown={(e) => onMouseDown(e, 'left')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />

      <Updator.TopLeftEdge
        onMouseDown={(e) => onMouseDown(e, 'topLeft')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />

      <Updator.TopRightEdge
        onMouseDown={(e) => onMouseDown(e, 'topRight')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />

      <Updator.BottomRightEdge
        onMouseDown={(e) => onMouseDown(e, 'bottomRight')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />

      <Updator.BottomLeftEdge
        onMouseDown={(e) => onMouseDown(e, 'bottomLeft')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />
    </>
  );
}
