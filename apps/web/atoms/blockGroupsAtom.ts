import { atom } from 'jotai';

import { BlockMembersType, Blocks, Groups } from 'ui';

export interface BlockGroupToggleStoreInterface {
  [id: string]: boolean;
}

export interface BlockGroupsStore {
  groupsStore: Record<string, Groups>;
  blocksStore: Record<string, Blocks>;
}
export interface BlockGroupsAtomInterface extends BlockGroupsStore {
  activeId: string | null;
  groupChildrenStore: Record<keyof BlockGroupsAtomInterface['groupsStore'], string[]>;
  snapshots: BlockGroupsStore;
}

export const blocksStateAtom = atom<BlockGroupsAtomInterface>({
  activeId: null,
  groupsStore: {},
  groupChildrenStore: {},
  blocksStore: {},
  snapshots: {
    blocksStore: {},
    groupsStore: {},
  },
});

export const assembledBlockGroups = atom((get): BlockMembersType | null => {
  const blocksState = get(blocksStateAtom);
  if (!Object.keys(blocksState.blocksStore)) return null;

  const result: BlockMembersType = [];

  const groups: Record<string, Groups> = JSON.parse(JSON.stringify(blocksState.groupsStore));

  const groupsArr = Object.values(groups);
  const blocksArr = Object.values(blocksState.blocksStore);

  groupsArr.forEach((group) => {
    if (group.parent === null) {
      result.push(group);
    }
  });

  blocksArr.forEach((block) => {
    if (block.parent === null) {
      result.push(block);
    }
  });

  return result;
});

export const activedBlockGroupAtom = atom<Blocks | Groups | null>((get) => {
  const blockGroupState = get(blocksStateAtom);

  const activeId = blockGroupState.activeId;

  if (activeId === null) return null;

  return blockGroupState.blocksStore[activeId] ?? blockGroupState.groupsStore[activeId];
});
