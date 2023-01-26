import { blocksStateAtom } from '@atoms/blockGroupsAtom';
import { BlockResponseInterface, GroupResponseInterface } from '@models/index';

import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { IdType } from 'ui';

// [ ] 원인: 지금 부모의 blocks에서의 데이터가 변경이 되지 않고, groupsStore에서만 변경이 일어났으므로 데이터가 불일치함.

export const useBlockGroups = (
  blockGroupsData: (BlockResponseInterface | GroupResponseInterface)[]
) => {
  const [blockGroupState, setBlockGroupState] = useAtom(blocksStateAtom);

  useEffect(() => {
    const groupsStore: Record<string, GroupResponseInterface> = {};
    const blocksStore: Record<string, BlockResponseInterface> = {};

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
    const recursiveRegisterComponentStore = (
      components: (BlockResponseInterface | GroupResponseInterface)[]
    ) => {
      if (!components.length) return;

      components.forEach((blockGroupStyle) => {
        const deepCopiedBlockGroupStyleObj = blockGroupStyle;
        if (deepCopiedBlockGroupStyleObj.type === 'group') {
          groupsStore[deepCopiedBlockGroupStyleObj.id] = deepCopiedBlockGroupStyleObj;

          recursiveRegisterComponentStore(deepCopiedBlockGroupStyleObj.blocks);
        } else {
          blocksStore[deepCopiedBlockGroupStyleObj.id] = deepCopiedBlockGroupStyleObj;
        }
      });
    };

    recursiveRegisterComponentStore(blockGroupsData);

    setBlockGroupState((state) => ({
      ...state,
      groupsStore,
      blocksStore,
    }));

    return () => {
      setBlockGroupState(() => ({ activeId: null, groupsStore: {}, blocksStore: {} }));
    };
  }, [blockGroupsData, setBlockGroupState]);

  const setBlocks = (blocks: Record<string, BlockResponseInterface>) => {
    setBlockGroupState((state) => ({
      ...state,
      blocksStore: blocks,
    }));
  };

  const setGroups = (groups: Record<string, GroupResponseInterface>) => {
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
    const parentId = blockGroupState.groupsStore[id].parent;

    const nextState = {
      ...blockGroupState.groupsStore[id],
      toggled: !blockGroupState.groupsStore[id].toggled,
    };

    syncWithParentGroupBlocksState({ parentId, id, nextState });
  };

  const syncWithParentGroupBlocksState = ({
    parentId,
    id,
    nextState,
  }: {
    parentId: IdType;
    id: string;
    nextState: GroupResponseInterface;
  }) => {
    const nextGroupsStoreState = {
      ...blockGroupState.groupsStore,
      [id]: nextState,
    };

    if (parentId) {
      nextGroupsStoreState[parentId].blocks = nextGroupsStoreState[parentId].blocks.map((v) =>
        v.id === id ? nextState : v
      );
    }

    setBlockGroupState((state) => ({
      ...state,
      groupsStore: nextGroupsStoreState,
    }));
  };

  const setOrder = (groups: GroupResponseInterface[]) => {
    const nextGroups: Record<string, GroupResponseInterface> = {};

    groups.forEach((group) => {
      nextGroups[group.id] = {
        ...group,
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
