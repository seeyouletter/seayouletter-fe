import { blockGroupStateAtom } from '@atoms/blockGroupAtom';

import { useAtom } from 'jotai';

import { GroupInterface } from 'ui';

export const useBlockGroups = () => {
  const [blockGroupState, setBlockGroupState] = useAtom(blockGroupStateAtom);

  const setActiveId = (id: string) => {
    setBlockGroupState((state) => ({
      ...state,
      activeId: id,
    }));
  };

  const setToggleStore = (id: string) => {
    /**
     * @todo
     * 이게 어렵겠다. 결국에 매순간마다 재귀적으로 탐색해야 하는데, 비용이 너무 비싸다.
     * flat하게 구조를 가져가서, 이를 체크하는 방법을 고민해야겠다.
     */
    /* eslint-disable-next-line */
    console.log(id);
  };

  const setBlockGroups = (blockGroups: GroupInterface[]) => {
    setBlockGroupState((state) => ({
      ...state,
      blockGroups,
    }));
  };

  return {
    activeId: blockGroupState.activeId,
    toggleStore: blockGroupState.toggleStore,
    blockGroups: blockGroupState.blockGroups,
    setActiveId,
    setToggleStore,
    setBlockGroups,
  };
};
