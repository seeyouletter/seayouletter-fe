import { useEffect } from 'react';

import { useSetAtom } from 'jotai';

import { BlockMembersType, Blocks, Groups } from 'ui';

import { blocksStateAtom } from '@atoms/blockGroupsAtom';

import { useBlockGroupsAtom } from './useBlockGroupsAtom';

export const useCreateBlockGroupsStore = (blockGroupsData: BlockMembersType) => {
  const setBlockGroupState = useSetAtom(blocksStateAtom);

  const { setGroupChildrenStore } = useBlockGroupsAtom();

  useEffect(() => {
    const groupsStore: Record<string, Groups> = {};
    const blocksStore: Record<string, Blocks> = {};

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
    const recursiveRegisterComponentStore = (components: (Blocks | Groups)[]) => {
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
};
