import React, { MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';

import { useBlockGroupsAtom, useResizablePageAtom, useTemplateTaskHistories } from '@hooks/index';

import { convertPxStringToNumber } from '@utils/typeConvert';

import { BlockGroupPriorities, DefaultBox, Position, ShapeBlock } from 'ui';

import { Updator } from './Updator';

interface ShapeLeafPropsInterface extends BlockGroupPriorities {
  data: ShapeBlock;
}

export function ShapeLeaf({ data, depth, order }: ShapeLeafPropsInterface) {
  const { activeId, setHoverId, initializeHoverBlockGroup, changeBlockState } =
    useBlockGroupsAtom();

  const { setActiveId, setNextActivedBlockGroup, setToggleTrue } = useBlockGroupsAtom();

  const [isPossibleMove, setIsPossibleMove] = useState(false);

  const [lastOffset, setLastOffset] = useState({
    top: 0,
    left: 0,
  });

  const updatedPosition = useRef<{ top: Position['top'] | null; left: Position['left'] | null }>({
    top: null,
    left: null,
  });

  const { pageState } = useResizablePageAtom();

  const { addTask } = useTemplateTaskHistories();
  /**
   * @see: feat(component): set click event to active block or group
   */
  const onClickLeaf = (e: ReactMouseEvent) => {
    e.stopPropagation();
    setActiveId('block', data.id, depth, order);
  };

  const onMouseDown = (e: ReactMouseEvent) => {
    e.stopPropagation();
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
    if (!isPossibleMove) return;

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

    setIsPossibleMove(() => false);
  };

  /**
   * @see: feat(component): set click event to active block or group
   */
  const onDoubleClickLeaf = (e: ReactMouseEvent) => {
    e.stopPropagation();
    setNextActivedBlockGroup({ type: 'group', id: data.id, depth, order });
    if (data.parent) {
      setToggleTrue(data.parent);
    }
  };

  return (
    <DefaultBox
      ref={boxRef}
      position="absolute"
      // INFO: Size
      width={data.style.size.width}
      height={data.style.size.height}
      // INFO: Position
      top={data.style.position.top}
      right={data.style.position.right}
      bottom={data.style.position.bottom}
      left={data.style.position.left}
      // INFO: Bg
      backgroundColor={data.style.bg}
      opacity={data.style.opacity}
      // INFO: Border
      // NOTE: rgba를 hex로 바꾸는 방법을 탐색한다.
      borderTopColor={data.style.border.top.color}
      borderTopStyle={data.style.border.top.style}
      borderTopWidth={data.style.border.top.width}
      // NOTE: rgba를 hex로 바꾸는 방법을 탐색한다.
      borderRightColor={data.style.border.right.color}
      borderRightStyle={data.style.border.right.style}
      borderRightWidth={data.style.border.right.width}
      // NOTE: rgba를 hex로 바꾸는 방법을 탐색한다.
      borderBottomColor={data.style.border.bottom.color}
      borderBottomStyle={data.style.border.bottom.style}
      borderBottomWidth={data.style.border.bottom.width}
      // NOTE: rgba를 hex로 바꾸는 방법을 탐색한다.
      borderLeftColor={data.style.border.left.color}
      borderLeftStyle={data.style.border.left.style}
      borderLeftWidth={data.style.border.left.width}
      // INFO: BorderRadius
      borderTopLeftRadius={data.style.borderRadius.topLeft}
      borderTopRightRadius={data.style.borderRadius.topRight}
      borderBottomRightRadius={data.style.borderRadius.bottomRight}
      borderBottomLeftRadius={data.style.borderRadius.bottomLeft}
      data-order={order}
      onMouseOver={() => setHoverId({ id: data.id, depth, order })}
      onMouseLeave={() => initializeHoverBlockGroup()}
      onClick={onClickLeaf}
      onMouseDownCapture={onMouseDown}
      onMouseUp={onMouseUp}
      onDoubleClick={onDoubleClickLeaf}
    >
      {activeId === data.id && <Updator item={data} />}
    </DefaultBox>
  );
}
