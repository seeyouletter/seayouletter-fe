import React from 'react';

import { useBlockGroupsAtom } from '@hooks/useBlockGroupsAtom';

import { DefaultBox, ShapeBlock } from 'ui';

import { Updator } from './Updator';

interface ShapeLeafPropsInterface {
  data: ShapeBlock;
}

export function ShapeLeaf({ data }: ShapeLeafPropsInterface) {
  const { activeId } = useBlockGroupsAtom();
  return (
    <DefaultBox
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
    >
      {activeId === data.id && <Updator item={data} />}
    </DefaultBox>
  );
}
