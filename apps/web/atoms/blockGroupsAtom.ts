import { BlockResponseInterface, GroupResponseInterface } from '@models/index';

import { atom } from 'jotai';

export interface BlockGroupToggleStoreInterface {
  [id: string]: boolean;
}

export interface BlockGroupsAtomInterface {
  activeId: string | null;
  groupsStore: Record<string, GroupResponseInterface>;
  groupChildrenStore: Record<keyof BlockGroupsAtomInterface['groupsStore'], string[]>;
  blocksStore: Record<string, BlockResponseInterface>;
}

export const blocksStateAtom = atom<BlockGroupsAtomInterface>({
  activeId: null,
  groupsStore: {},
  groupChildrenStore: {},
  blocksStore: {},
});

export const assembledBlockGroups = atom(
  (get): (GroupResponseInterface | BlockResponseInterface)[] | null => {
    const blocksState = get(blocksStateAtom);
    if (!Object.keys(blocksState.blocksStore)) return null;

    const result: (BlockResponseInterface | GroupResponseInterface)[] = [];

    const groups: Record<string, GroupResponseInterface> = JSON.parse(
      JSON.stringify(blocksState.groupsStore)
    );

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
  }
);
