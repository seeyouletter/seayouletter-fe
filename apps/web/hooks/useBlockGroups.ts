import { blocksStateAtom } from '@atoms/blockGroupsAtom';
import { BlockResponseInterface, GroupResponseInterface } from '@models/index';

import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { Position } from './../../../packages/ui/types/models/Blocks';
import { BlockGroupType, IdType } from 'ui';

const typeProperties = {
  group: 'groupsStore',
  block: 'blocksStore',
} as const;

export const useBlockGroups = (
  blockGroupsData: (BlockResponseInterface | GroupResponseInterface)[]
) => {
  const [blockGroupState, setBlockGroupState] = useAtom(blocksStateAtom);

  const setGroupChildrenStore = (id: string, children: string[]) => {
    setBlockGroupState((state) => ({
      ...state,
      groupChildrenStore: {
        ...state.groupChildrenStore,
        [id]: children,
      },
    }));
  };

  /**
   * @description
   * INFO: 이는 블록 상태를 업데이트했을 때 blocksStore 변경과 동시에 groupsStore의 해당 parentGroup의 blocks를 업데이트하기 위한 로직입니다.
   * group의 blocks들은 결국 하위 그룹의 상태가 변화하면 서로의 값이 불일치하게 됩니다.
   * 따라서 이를 해결해주기 위해, 등록한 상위 컴포넌트에서의 blocks에 있는 이전의 자신의 상태를 새롭게 업데이트하는 로직입니다.
   */
  const syncBlockStateWithParentGroupBlocks = ({
    parentId,
    id,
    nextState,
  }: {
    parentId: IdType;
    id: string;
    nextState: BlockResponseInterface;
  }) => {
    const nextBlocksStoreState = { ...blockGroupState.blocksStore, [id]: nextState };
    const nextGroupsStoreState = { ...blockGroupState.groupsStore };

    if (parentId) {
      nextGroupsStoreState[parentId].blocks = nextGroupsStoreState[parentId].blocks.map((v) =>
        v.id === id ? nextState : v
      );
    }

    setBlockGroupState((state) => ({
      ...state,
      blocksStore: nextBlocksStoreState,
      groupsStore: nextGroupsStoreState,
    }));
  };

  /**
   * @description
   * INFO: 이는 하위 그룹 상태를 업데이트했을 때 하위 그룹 변경과 동시에 groupsStore의 해당 parentGroup의 blocks를 업데이트하기 위한 로직입니다.
   * group의 blocks들은 결국 하위 그룹의 상태가 변화하면 서로의 값이 불일치하게 됩니다.
   * 따라서 이를 해결해주기 위해, 등록한 상위 컴포넌트에서의 blocks에 있는 이전의 자신의 상태를 새롭게 업데이트하는 로직입니다.
   */
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

    setGroupsStore(nextGroupsStoreState);
  };

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

          setGroupChildrenStore(
            deepCopiedBlockGroupStyleObj.id,
            deepCopiedBlockGroupStyleObj.blocks.map((v) => v.id)
          );

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
      setBlockGroupState(() => ({
        activeId: null,
        groupChildrenStore: {},
        groupsStore: {},
        blocksStore: {},
      }));
    };

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [blockGroupsData, setBlockGroupState]);

  const setBlocks = (blocks: Record<string, BlockResponseInterface>) => {
    setBlockGroupState((state) => ({
      ...state,
      blocksStore: blocks,
    }));
  };

  const setGroupsStore = (groups: Record<string, GroupResponseInterface>) => {
    setBlockGroupState((state) => ({
      ...state,
      groupsStore: groups,
    }));
  };

  const setActiveId = (type: BlockGroupType, id: string) => {
    setBlockGroupState((state) => ({
      ...state,
      activeId: id,
      detail: (type === 'block' ? blockGroupState.blocksStore : blockGroupState.groupsStore)[id],
    }));
  };

  const setTitle = (type: BlockGroupType, id: string, title: string) => {
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

  const setOrder = (groups: GroupResponseInterface[]) => {
    const nextGroups: Record<string, GroupResponseInterface> = {};

    groups.forEach((group) => {
      nextGroups[group.id] = {
        ...group,
      };
    });
  };

  /**
   * NOTE: 아직 group의 position 속성에 대해 명세가 정해지지 않은 상태이다. 추후 확정되면 업데이트한다.
   */
  const setPosition = ({
    type,
    id,
    position,
  }: {
    type: BlockResponseInterface['type'];
    id: BlockResponseInterface['id'];
    position: Position;
  }) => {
    if (type === 'block') {
      const nowState = blockGroupState.blocksStore[id];

      const nextState = {
        ...nowState,
        style: {
          ...nowState.style,
          position,
        },
      };

      syncBlockStateWithParentGroupBlocks({ parentId: nowState.parent, id, nextState });
    }
  };

  return {
    activeId: blockGroupState.activeId,
    setBlocks,
    setActiveId,
    setTitle,
    setToggle,
    setOrder,
    setPosition,
  };
};
