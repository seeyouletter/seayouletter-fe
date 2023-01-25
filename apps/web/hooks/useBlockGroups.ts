import { blocksStateAtom } from '@atoms/blockGroupsAtom';

import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { BlockInterface, GroupInterface } from 'ui';

export const useBlockGroups = (blockGroupsData: (BlockInterface | GroupInterface)[]) => {
  const [blockGroupState, setBlockGroupState] = useAtom(blocksStateAtom);

  useEffect(() => {
    const groupsStore: Record<string, GroupInterface> = {};
    const blocksStore: Record<string, BlockInterface> = {};

    /**
     *
     * @description
     *
     * Store라는 object들을 업데이트하기 위한 로직입니다.
     * 기존에는 계층구조를 업데이트하기 위해 완전 탐색이 필요했으며, 최악의 경우에는 O(N) 모두를 탐색해야 합니다.
     *
     * 따라서 대안으로 Store를 구현했습니다. 이는 해당 컴포넌트를 해시테이블의 형태로 관리합니다. 이때 컴포넌트에는 parent의 id가 담겨있죠.
     * 따라서 O(2 x 상위 계층 개수)만큼 탐색하는 방법으로 업데이트할 수 있도록 합니다.
     */
    const recursiveRegisterComponentStore = (components: (BlockInterface | GroupInterface)[]) => {
      if (!components.length) return;

      components.forEach((blockGroupComponent) => {
        if (blockGroupComponent.type === 'group') {
          groupsStore[blockGroupComponent.id] = blockGroupComponent;
          recursiveRegisterComponentStore(blockGroupComponent.blocks);
        } else {
          blocksStore[blockGroupComponent.id] = blockGroupComponent;
        }
      });
    };

    recursiveRegisterComponentStore(blockGroupsData);

    setBlockGroupState((state) => ({
      ...state,
      data: [...blockGroupsData],
      groupsStore,
      blocksStore,
    }));

    return () => {
      setBlockGroupState(() => ({ data: null, activeId: null, groupsStore: {}, blocksStore: {} }));
    };
  }, [blockGroupsData, setBlockGroupState]);

  const setBlocks = (blocks: Record<string, BlockInterface>) => {
    setBlockGroupState((state) => ({
      ...state,
      blocksStore: blocks,
    }));
  };

  const setGroups = (groups: Record<string, GroupInterface>) => {
    setBlockGroupState((state) => ({
      ...state,
      groupsStore: groups,
    }));
  };

  const setActiveId = (id: string) => {
    setBlockGroupState((state) => ({
      ...state,
      activeId: id,
    }));
  };

  const setTitle = (type: 'group' | 'block', id: string, title: string) => {
    const typeProperties = {
      group: 'groupsStore',
      block: 'blocksStore',
    } as const;

    const key = typeProperties[type];

    setBlockGroupState((state) => ({
      ...state,
      [key]: {
        ...state[key],
        [id]: {
          ...state[key][id],
          title,
        },
      },
    }));
  };

  const setToggle = (id: string) => {
    setBlockGroupState((state) => ({
      ...state,
      groupsStore: {
        ...state.groupsStore,
        [id]: {
          ...state.groupsStore[id],
          toggled: !state.groupsStore[id].toggled,
        },
      },
    }));
  };

  const setOrder = (groups: GroupInterface[]) => {
    const nextGroups: Record<string, GroupInterface> = {};

    groups.forEach((group, idx) => {
      nextGroups[group.id] = {
        ...group,
        order: idx,
      };
    });
  };

  return {
    activeId: blockGroupState.activeId,
    setBlocks,
    setGroups,
    setActiveId,
    setTitle,
    setToggle,
    setOrder,
  };
};
