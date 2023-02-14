import React, { MouseEvent } from 'react';

import { useBlockGroupsAtom } from '@hooks/useBlockGroupsAtom';

import { BlockGroupPriorities, DefaultBox, Groups } from 'ui';

/**
 * NOTE: 재귀적으로 블록을 렌더링하기 위해 설정했다.
 */

/* eslint-disable-next-line import/no-cycle */
import { NodeList } from './NodeList';

interface NodePropsInterface extends BlockGroupPriorities {
  data: Groups;
}

export function Node({ data, depth, order }: NodePropsInterface) {
  const { setActiveId, setNextActivedBlockGroup } = useBlockGroupsAtom();

  /**
   * @see: feat(component): set click event to active block or group
   */
  const onClickNode = (e: MouseEvent) => {
    e.stopPropagation();
    setActiveId('group', data.id, depth, order);
  };

  /**
   * @see: feat(component): set click event to active block or group
   */
  const onDoubleClickNode = (e: MouseEvent) => {
    e.stopPropagation();
    setNextActivedBlockGroup({ type: 'group', id: data.id, depth, order });
  };

  return (
    <DefaultBox
      id={data.id}
      data-order={order}
      onClick={onClickNode}
      onDoubleClick={onDoubleClickNode}
    >
      <NodeList depth={depth + 1} listItems={data.blocks} />
      {data.id}
    </DefaultBox>
  );
}
