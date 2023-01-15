import { blocksStateAtom } from '@atoms/blockGroupsAtom';

import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { BlockInterface, GroupInterface } from 'ui';

export const useBlockGroups = (blockGroupsData: (BlockInterface | GroupInterface)[]) => {
  const [blockGroupState, setBlockGroupState] = useAtom(blocksStateAtom);

  useEffect(() => {
    const groups: Record<string, GroupInterface> = {};
    const blocks: Record<string, BlockInterface> = {};

    blockGroupsData.forEach((blockGroup) => {
      if (blockGroup.type === 'group') {
        groups[blockGroup.id] = { ...blockGroup };
      } else {
        blocks[blockGroup.id] = { ...blockGroup };
      }
    });

    setBlockGroupState((state) => ({
      ...state,
      groups,
      blocks,
    }));

    return () => {
      setBlockGroupState(() => ({ activeId: null, groups: {}, blocks: {} }));
    };
  }, [blockGroupsData, setBlockGroupState]);

  const setBlocks = (blocks: Record<string, BlockInterface>) => {
    setBlockGroupState((state) => ({
      ...state,
      blocks,
    }));
  };

  const setGroups = (groups: Record<string, GroupInterface>) => {
    setBlockGroupState((state) => ({
      ...state,
      groups,
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
      group: 'groups',
      block: 'blocks',
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
      groups: {
        ...state.groups,
        [id]: {
          ...state.groups[id],
          toggled: !state.groups[id].toggled,
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
