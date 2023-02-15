import { MouseEvent as ReactMouseEvent } from 'react';

import { useBlockGroupsAtom } from '@hooks/index';

import { Blocks } from 'ui';

import { UseLeafParams } from './types';

export const useSearchActiveBlockGroup = <T extends Blocks>({
  data,
  depth,
  order,
}: UseLeafParams<T>) => {
  const { setActiveId, setNextActivedBlockGroup, setToggleTrue } = useBlockGroupsAtom();

  /**
   * @see: feat(component): set click event to active block or group
   */
  const onActiveTarget = (e: ReactMouseEvent) => {
    e.stopPropagation();
    setActiveId('block', data.id, depth, order);
  };

  /**
   * @description
   * 더블클릭 시 속해 있는 하위 블록/그룹에 접근할 수 있도록 했다.
   *
   * @see: feat(component): set click event to active block or group
   */
  const onSearchNextTarget = (e: ReactMouseEvent) => {
    e.stopPropagation();

    setNextActivedBlockGroup({ type: 'group', id: data.id, depth, order });
    if (data.parent) {
      setToggleTrue(data.parent);
    }
  };

  return {
    onActiveTarget,
    onSearchNextTarget,
  };
};
