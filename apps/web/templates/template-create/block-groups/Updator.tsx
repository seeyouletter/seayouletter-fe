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

interface EdgeInterface {
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
      onMouseDown={onMouseDown}
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
      onMouseDown={onMouseDown}
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
      onMouseDown={onMouseDown}
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
      onMouseDown={onMouseDown}
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
      onMouseDown={onMouseDown}
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
      onMouseDown={onMouseDown}
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
      onMouseDown={onMouseDown}
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
      if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return;
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
      if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return;
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

  useEffect(() => {
    const lineLeftMouseMoveHandler = (e: MouseEvent) => {
      if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return;
      if (!isUpdating.left) return;

      const { clientX } = e;

      const activedBlockLeft = convertPxStringToNumber(activedBlockGroup.style.position.left);
      const activedBlockWidth = convertPxStringToNumber(activedBlockGroup.style.size.width);
      const activedRightLineFromLeft = activedBlockWidth + activedBlockLeft;

      const pageLeft = +pageState.left;

      const nowLeft = clientX - pageLeft;

      const isReversed = nowLeft > activedRightLineFromLeft;

      const nextLeft = isReversed ? activedRightLineFromLeft : nowLeft;
      const nextRight = isReversed ? nowLeft : activedRightLineFromLeft;

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
      if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return;
      if (!isUpdating.right) return;

      const { clientX } = e;

      const activedBlockLeft = convertPxStringToNumber(activedBlockGroup.style.position.left);

      const pageLeft = +pageState.left;

      const nowRight = clientX - pageLeft;

      const isReversed = nowRight < activedBlockLeft;

      const nextLeft = isReversed ? nowRight : activedBlockLeft;
      const nextRight = isReversed ? activedBlockLeft : nowRight;

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

      const activedBlockTop = convertPxStringToNumber(activedBlockGroup.style.position.top);
      const activedBlockLeft = convertPxStringToNumber(activedBlockGroup.style.position.left);
      const activedBlockWidth = convertPxStringToNumber(activedBlockGroup.style.size.width);
      const activedBlocHeight = convertPxStringToNumber(activedBlockGroup.style.size.height);
      const activedBlockRightLineFromLeft = activedBlockLeft + activedBlockWidth;
      const activedBlockBottomLineFromTop = activedBlockTop + activedBlocHeight;

      const pageScrollY = pageState.scrollY;
      const pageTop = +pageState.top;
      const pageLeft = +pageState.left;

      const nowTop = pageScrollY - pageTop + clientY;
      const nowLeft = clientX - pageLeft;

      const isTopReversed = activedBlockBottomLineFromTop < nowTop;
      const isLeftReversed = activedBlockRightLineFromLeft < nowLeft;

      const nextLeft = isLeftReversed ? activedBlockRightLineFromLeft : nowLeft;
      const nextRightLineFormLeft = isLeftReversed ? nowLeft : activedBlockRightLineFromLeft;

      const nextTop = isTopReversed ? activedBlockBottomLineFromTop : nowTop;
      const nextBottomLineFromTop = isTopReversed ? nowTop : activedBlockBottomLineFromTop;

      const nextWidth = nextRightLineFormLeft - nextLeft;
      const nextHeight = nextBottomLineFromTop - nextTop;

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

      const activedBlockTop = convertPxStringToNumber(activedBlockGroup.style.position.top);
      const activedBlockLeft = convertPxStringToNumber(activedBlockGroup.style.position.left);
      const activedBlocHeight = convertPxStringToNumber(activedBlockGroup.style.size.height);

      const activedBlockBottomLineFromTop = activedBlockTop + activedBlocHeight;

      const pageScrollY = pageState.scrollY;
      const pageTop = +pageState.top;
      const pageLeft = +pageState.left;

      const nowTop = pageScrollY - pageTop + clientY;
      const nowRightFromLeft = clientX - pageLeft;

      const isTopReversed = activedBlockBottomLineFromTop < nowTop;
      const isRightReversed = nowRightFromLeft < activedBlockLeft;

      const nextLeft = isRightReversed ? nowRightFromLeft : activedBlockLeft;
      const nextRightLineFormLeft = isRightReversed ? activedBlockLeft : nowRightFromLeft;

      const nextTop = isTopReversed ? activedBlockBottomLineFromTop : nowTop;
      const nextBottomLineFromTop = isTopReversed ? nowTop : activedBlockBottomLineFromTop;

      const nextWidth = nextRightLineFormLeft - nextLeft;
      const nextHeight = nextBottomLineFromTop - nextTop;

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

      const activedBlockTop = convertPxStringToNumber(activedBlockGroup.style.position.top);
      const activedBlockLeft = convertPxStringToNumber(activedBlockGroup.style.position.left);

      const pageScrollY = pageState.scrollY;
      const pageTop = +pageState.top;
      const pageLeft = +pageState.left;

      const nowBottomFromTop = pageScrollY - pageTop + clientY;
      const nowRightFromLeft = clientX - pageLeft;

      const isBottomReversed = nowBottomFromTop < activedBlockTop;
      const isRightReversed = nowRightFromLeft < activedBlockLeft;

      const nextLeft = isRightReversed ? nowRightFromLeft : activedBlockLeft;
      const nextRightLineFormLeft = isRightReversed ? activedBlockLeft : nowRightFromLeft;

      const nextTop = isBottomReversed ? nowBottomFromTop : activedBlockTop;
      const nextBottomLineFromTop = isBottomReversed ? activedBlockTop : nowBottomFromTop;

      const nextWidth = nextRightLineFormLeft - nextLeft;
      const nextHeight = nextBottomLineFromTop - nextTop;

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

      const activedBlockTop = convertPxStringToNumber(activedBlockGroup.style.position.top);
      const activedBlockLeft = convertPxStringToNumber(activedBlockGroup.style.position.left);
      const activedBlockWidth = convertPxStringToNumber(activedBlockGroup.style.size.width);
      const activedBlockRightLineFromLeft = activedBlockLeft + activedBlockWidth;

      const pageScrollY = pageState.scrollY;
      const pageTop = +pageState.top;
      const pageLeft = +pageState.left;

      const nowBottomFromTop = pageScrollY - pageTop + clientY;
      const nowLeft = clientX - pageLeft;

      const isBottomReversed = nowBottomFromTop < activedBlockTop;
      const isLeftReversed = activedBlockRightLineFromLeft < nowLeft;

      const nextLeft = isLeftReversed ? activedBlockRightLineFromLeft : nowLeft;
      const nextRightLineFormLeft = isLeftReversed ? nowLeft : activedBlockRightLineFromLeft;

      const nextTop = isBottomReversed ? nowBottomFromTop : activedBlockTop;
      const nextBottomLineFromTop = isBottomReversed ? activedBlockTop : nowBottomFromTop;

      const nextWidth = nextRightLineFormLeft - nextLeft;
      const nextHeight = nextBottomLineFromTop - nextTop;

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
      <Updator.Top onMouseDown={() => onMouseDown('top')} onMouseUp={() => onMouseUp(nowUpdate)} />

      <Updator.Right
        onMouseDown={() => onMouseDown('right')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />

      <Updator.Bottom
        onMouseDown={() => onMouseDown('bottom')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />

      <Updator.Left
        onMouseDown={() => onMouseDown('left')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />

      <Updator.TopLeftEdge
        onMouseDown={() => onMouseDown('topLeft')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />
      <Updator.TopRightEdge
        onMouseDown={() => onMouseDown('topRight')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />
      <Updator.BottomRightEdge
        onMouseDown={() => onMouseDown('bottomRight')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />
      <Updator.BottomLeftEdge
        onMouseDown={() => onMouseDown('bottomLeft')}
        onMouseUp={() => onMouseUp(nowUpdate)}
      />
    </>
  );
}
