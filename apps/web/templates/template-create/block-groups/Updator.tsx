import React, { MouseEvent as ReactMouseEvent, useEffect, useState } from 'react';

import { useTheme } from '@emotion/react';

import { useBlockGroupsAtom, useResizablePageAtom, useTemplateTaskHistories } from '@hooks/index';

import { convertPxStringToNumber } from '@utils/index';

import { DefaultBox, Directions, EdgeDirections } from 'ui';

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

  const onMouseDown = (e: ReactMouseEvent, direction: EdgeDirections | Directions) => {
    e.stopPropagation();

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

  const getNextFromTop = (y: number): { nextTop: number; nextBottom: number } => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') {
      return {
        nextTop: 0,
        nextBottom: 0,
      };
    }

    const activedBlockTop = convertPxStringToNumber(activedBlockGroup.style.position.top);
    const activedBlockHeight = convertPxStringToNumber(activedBlockGroup.style.size.height);

    const nextTop = y - +pageState.top + pageState.scrollY;
    const nextBottom = activedBlockHeight + activedBlockTop;

    const isReversed = nextTop > nextBottom;

    return {
      nextTop: isReversed ? nextBottom : nextTop,
      nextBottom: isReversed ? nextTop : nextBottom,
    };
  };

  const getNextFromRight = (x: number): { nextLeft: number; nextRight: number } => {
    if (activedBlockGroup === null || activedBlockGroup.type === 'group') {
      return {
        nextLeft: 0,
        nextRight: 0,
      };
    }

    const activedBlockLeft = convertPxStringToNumber(activedBlockGroup.style.position.left);
    const nowRight = x - +pageState.left;

    const isReversed = nowRight < activedBlockLeft;

    return {
      nextLeft: isReversed ? nowRight : activedBlockLeft,
      nextRight: isReversed ? activedBlockLeft : nowRight,
    };
  };

  const getNextFromBottom = (y: number): { nextTop: number; nextBottom: number } => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') {
      return {
        nextTop: 0,
        nextBottom: 0,
      };
    }
    const nextTop = convertPxStringToNumber(activedBlockGroup.style.position.top);

    const nextBottom = y + pageState.scrollY - +pageState.top;

    const isReversed = nextBottom < nextTop;

    return {
      nextTop: isReversed ? nextBottom : nextTop,
      nextBottom: isReversed ? nextTop : nextBottom,
    };
  };

  const getNextFromLeft = (x: number): { nextLeft: number; nextRight: number } => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') {
      return {
        nextLeft: 0,
        nextRight: 0,
      };
    }

    const activedBlockLeft = convertPxStringToNumber(activedBlockGroup.style.position.left);
    const activedBlockWidth = convertPxStringToNumber(activedBlockGroup.style.size.width);
    const activedRightLineFromLeft = activedBlockWidth + activedBlockLeft;

    const pageLeft = +pageState.left;

    const nowLeft = x - pageLeft;

    const isReversed = nowLeft > activedRightLineFromLeft;

    const nextLeft = isReversed ? activedRightLineFromLeft : nowLeft;
    const nextRight = isReversed ? nowLeft : activedRightLineFromLeft;

    return {
      nextLeft,
      nextRight,
    };
  };

  useEffect(() => {
    const lineTopMouseMoveHandler = (e: MouseEvent) => {
      if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return;
      if (!isUpdating.top) return;

      const { clientY } = e;

      const { nextTop, nextBottom } = getNextFromTop(clientY);
      const nextHeight = nextBottom - nextTop;

      const nextPosition = {
        ...activedBlockGroup.style.position,
        top: nextTop + 'px',
      };

      const nextSize = {
        ...activedBlockGroup.style.size,
        height: nextHeight + 'px',
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

    window.addEventListener('mousemove', lineTopMouseMoveHandler);

    return () => {
      window.removeEventListener('mousemove', lineTopMouseMoveHandler);
    };

    /* eslint-disable-next-line */
  }, [isUpdating]);

  useEffect(() => {
    const lineBottomMouseMoveHandler = (e: MouseEvent) => {
      if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return;
      if (!isUpdating.bottom) return;

      const { clientY } = e;

      const { nextTop, nextBottom } = getNextFromBottom(clientY);

      const nextPosition = {
        ...activedBlockGroup.style.position,
        top: nextTop + 'px',
      };

      const nextSize = {
        ...activedBlockGroup.style.size,
        height: nextBottom - nextTop + 'px',
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

  useEffect(() => {
    const lineLeftMouseMoveHandler = (e: MouseEvent) => {
      if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return;
      if (!isUpdating.left) return;

      const { clientX } = e;

      const { nextLeft, nextRight } = getNextFromLeft(clientX);

      const nextWidth = nextRight - nextLeft;

      const nextSize = {
        ...activedBlockGroup.style.size,
        width: nextWidth + 'px',
      };

      const nextPosition = {
        ...activedBlockGroup.style.position,
        left: nextLeft + 'px',
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

    window.addEventListener('mousemove', lineLeftMouseMoveHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', lineLeftMouseMoveHandler);
    };

    /* eslint-disable-next-line */
  }, [isUpdating]);

  useEffect(() => {
    const lineRightMouseMoveHandler = (e: MouseEvent) => {
      if (activedBlockGroup === null || activedBlockGroup.type === 'group') return;
      if (!isUpdating.right) return;

      /**
       * @inner
       * useMouseStateAtom으로 하지 않는 이유는, 현재 이벤트에서 가져오는 값이 훨씬 속도가 빠르기 때문이다.
       * throttle을 제거하더라도, mouseMove의 변수를 가져오는 속도는 생각보다 느리다.
       * 전역 상태의 값을 찾아야 하기 때문이다.
       *
       * 반면 해당 작업은 유저가 세밀하게 작업하기 때문에 속도에 대한 역치가 상당히 낮다.
       * 따라서 어쩔 수 없이 리플로우를 유발하더라도 사용한다.
       */
      const { clientX } = e;

      const { nextLeft, nextRight } = getNextFromRight(clientX);
      const nextWidth = nextRight - nextLeft;

      const nextSize = {
        ...activedBlockGroup.style.size,
        width: nextWidth + 'px',
      };

      const nextPosition = {
        ...activedBlockGroup.style.position,
        left: nextLeft + 'px',
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

    window.addEventListener('mousemove', lineRightMouseMoveHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', lineRightMouseMoveHandler);
    };

    /* eslint-disable-next-line */
  }, [isUpdating]);

  useEffect(() => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return;
    if (!isUpdating.topLeft) return;

    const edgesBottomLeftMouseMoveHandler = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      const { nextTop, nextBottom } = getNextFromTop(clientY);
      const { nextLeft, nextRight } = getNextFromLeft(clientX);

      const nextWidth = nextRight - nextLeft;
      const nextHeight = nextBottom - nextTop;

      const nextSize = {
        ...activedBlockGroup.style.size,
        width: nextWidth + 'px',
        height: nextHeight + 'px',
      };

      const nextPosition = {
        ...activedBlockGroup.style.position,
        left: nextLeft + 'px',
        top: nextTop + 'px',
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

    window.addEventListener('mousemove', edgesBottomLeftMouseMoveHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', edgesBottomLeftMouseMoveHandler);
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

      if (activedBlockGroup.subType !== 'text') {
        const nextState = {
          ...activedBlockGroup,
          style: {
            ...activedBlockGroup.style,
            size: {
              ...activedBlockGroup.style.size,
              width: nextWidth + 'px',
              height: nextHeight + 'px',
            },
            position: {
              ...activedBlockGroup.style.position,
              left: nextLeft + 'px',
              top: nextTop + 'px',
            },
          },
        };

        changeBlockState(nextState);
      } else {
        const nextState = {
          ...activedBlockGroup,
          style: {
            ...activedBlockGroup.style,
            size: {
              ...activedBlockGroup.style.size,
              width: nextWidth + 'px',
              height: nextHeight + 'px',
            },
            position: {
              ...activedBlockGroup.style.position,
              left: nextLeft + 'px',
              top: nextTop + 'px',
            },
          },
        };

        changeBlockState(nextState);
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

      const nextSize = {
        ...activedBlockGroup.style.size,
        width: nextWidth + 'px',
        height: nextHeight + 'px',
      };

      const nextPosition = {
        ...activedBlockGroup.style.position,
        left: nextLeft + 'px',
        top: nextTop + 'px',
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

      const nextSize = {
        ...activedBlockGroup.style.size,
        width: nextWidth + 'px',
        height: nextHeight + 'px',
      };

      const nextPosition = {
        ...activedBlockGroup.style.position,
        left: nextLeft + 'px',
        top: nextTop + 'px',
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
