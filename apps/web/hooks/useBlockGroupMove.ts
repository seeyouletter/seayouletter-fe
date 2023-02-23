/**
 * NOTE: 추후 pnpm이 모노레포를 원활히 지원한다면 제거한다.
 */
import type {} from 'node_modules/@types/react';
import { TaskTypeEnum } from 'types';

import { useCallback } from 'react';
import { MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';

import { convertPxStringToNumber } from '@utils/index';

import { NonTextBlock, Position, TextBlock } from 'ui';

import { UseLeafParams } from './types';
import { useBlockGroupsAtom } from './useBlockGroupsAtom';
import { useMouseStateAtom } from './useMouseStateAtom';
import { useResizablePageAtom } from './useResizablePageAtom';
import { useTemplateTaskHistories } from './useTemplateTaskHistories';

export const useBlockGroupMove = ({ data }: { data: UseLeafParams['data'] }) => {
  const { pageState } = useResizablePageAtom();
  const { mouseState, activeMouseMove, inactiveMouseMove } = useMouseStateAtom();

  const { addTask } = useTemplateTaskHistories();

  const { changeBlockState } = useBlockGroupsAtom();

  /**
   * @description
   * 얼핏 mouseState와 중복처럼 보이지만, 각개 블록들이 움직일 수 있는지에 대한 상태이기 때문에 반드시 있어야 한다.
   * 반면 mouseState는 전역에서 mouseMove 이벤트를 반영할지를 결정하여 최적화를 실행시킨다.
   */
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
    const { clientX, clientY } = e;
    activeMouseMove(clientX, clientY);

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

  const mouseMoveHandler = useCallback(
    (e: MouseEvent) => {
      if (!isPossibleMove || !mouseState.moveActived) return;

      /**
       * @inner
       * 이 역시 mouseState에서 가져오려 했으나, 생각보다 느리다.
       * 이벤트 관련된 위치 상태값들은 최대한 이벤트 객체에서 가져오는 것이 오히려 더 수월한 듯하다.
       * (리액트의 전역에서 관리할 때는 항상 필연적으로 리액트에서의 배치로 인한 시간이 추가로 소요되기 때문이다.)
       */
      const { clientX, clientY } = e;

      const nowLeft = clientX - +pageState.left - lastOffset.left;
      const nowTop = pageState.scrollY - +pageState.top + clientY - lastOffset.top;

      updatedPosition.current.left = nowLeft + 'px';
      updatedPosition.current.top = nowTop + 'px';

      const nextState = {
        ...data,
        style: {
          ...data.style,
          position: {
            ...data.style.position,
            left: nowLeft + 'px',
            top: nowTop + 'px',
          },
        },
      };

      if (data.subType !== 'text') {
        changeBlockState(nextState as TextBlock);
      } else {
        changeBlockState(nextState as NonTextBlock);
      }
    },
    [data, changeBlockState, isPossibleMove, lastOffset, mouseState, pageState]
  );

  useEffect(() => {
    if (!boxRef.current) return;

    // document.body.addEventListener('scroll', mouseMoveHandler, { passive: true });
    window.addEventListener('mousemove', mouseMoveHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      // window.removeEventListener('scroll', mouseMoveHandler);
    };

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [mouseMoveHandler, pageState]);

  const onMouseUp = () => {
    setIsPossibleMove(() => false);
    inactiveMouseMove();

    if (!updatedPosition.current.left || !updatedPosition.current.top) return;

    if (isPossibleMove) {
      if (data.subType === 'text') {
        addTask({
          taskType: TaskTypeEnum.update,
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
          taskType: TaskTypeEnum.update,
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
  };

  return {
    boxRef,
    onMouseUp,
    onMouseDown,
  };
};
