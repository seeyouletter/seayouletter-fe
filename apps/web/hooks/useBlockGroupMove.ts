/**
 * NOTE: 추후 pnpm이 모노레포를 원활히 지원한다면 제거한다.
 */
import type {} from 'node_modules/@types/react';

import { MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';

import { convertPxStringToNumber } from '@utils/index';

import { BlockGroupPriorities, Blocks, Position } from 'ui';

import { useBlockGroupsAtom } from './useBlockGroupsAtom';
import { useResizablePageAtom } from './useResizablePageAtom';
import { useTemplateTaskHistories } from './useTemplateTaskHistories';

interface UseBlockMoveParams<T = Blocks> extends BlockGroupPriorities {
  data: T;
}
export const useBlockGroupMove = ({ data, depth, order }: UseBlockMoveParams) => {
  const { pageState } = useResizablePageAtom();

  const { addTask } = useTemplateTaskHistories();

  const { setActiveId, changeBlockState } = useBlockGroupsAtom();

  const [isPossibleMove, setIsPossibleMove] = useState(false);

  const [lastOffset, setLastOffset] = useState({
    top: 0,
    left: 0,
  });

  const updatedPosition = useRef<{ top: Position['top'] | null; left: Position['left'] | null }>({
    top: null,
    left: null,
  });

  const onMouseDown = (e: ReactMouseEvent) => {
    setActiveId('block', data.id, depth, order);
    const { clientX, clientY } = e;

    setLastOffset((state) => ({
      ...state,
      left: clientX - +pageState.left - convertPxStringToNumber(data.style.position.left),
      top:
        pageState.scrollY -
        +pageState.top +
        clientY -
        convertPxStringToNumber(data.style.position.top),
    }));

    setIsPossibleMove(() => true);
  };

  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!boxRef.current) return;

    const mouseDownHandler = (e: MouseEvent) => {
      if (!isPossibleMove) return;

      const { clientX, clientY } = e;
      const nowLeft = clientX - +pageState.left - lastOffset.left;
      const nowTop = pageState.scrollY - +pageState.top + clientY - lastOffset.top;

      updatedPosition.current.left = nowLeft + 'px';
      updatedPosition.current.top = nowTop + 'px';

      if (data.subType !== 'text') {
        changeBlockState({
          ...data,
          style: {
            ...data.style,
            position: {
              ...data.style.position,
              left: nowLeft + 'px',
              top: nowTop + 'px',
            },
          },
        });
      } else {
        changeBlockState({
          ...data,
          style: {
            ...data.style,
            position: {
              ...data.style.position,
              left: nowLeft + 'px',
              top: nowTop + 'px',
            },
          },
        });
      }
    };

    window.addEventListener('mousemove', mouseDownHandler, {
      passive: true,
    });

    return () => {
      window.removeEventListener('mousemove', mouseDownHandler);
    };

    /* eslint-disable-next-line */
  }, [boxRef, isPossibleMove]);

  const onMouseUp = () => {
    if (!updatedPosition.current.left || !updatedPosition.current.top) return;

    if (isPossibleMove) {
      if (data.subType === 'text') {
        addTask({
          taskType: 'update',
          before: data,
          after: {
            ...data,
            style: {
              ...data.style,
              position: {
                ...data.style.position,
                left: updatedPosition.current.left,
                top: updatedPosition.current.top,
              },
            },
          },
        });
      } else {
        addTask({
          taskType: 'update',
          before: data,
          after: {
            ...data,
            style: {
              ...data.style,
              position: {
                ...data.style.position,
                left: updatedPosition.current.left,
                top: updatedPosition.current.top,
              },
            },
          },
        });
      }

      updatedPosition.current.top = null;
      updatedPosition.current.left = null;
    }

    setIsPossibleMove(() => false);
  };

  return {
    boxRef,
    onMouseUp,
    onMouseDown,
  };
};
