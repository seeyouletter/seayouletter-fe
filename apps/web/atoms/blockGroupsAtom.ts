import { atom } from 'jotai';

import { BlockInterface, GroupInterface } from 'ui';

export interface BlockGroupToggleStoreInterface {
  [id: string]: boolean;
}

export interface BlockGroupsAtomInterface {
  activeId: string | null;
  groupsStore: Record<string, GroupInterface>;
  blocksStore: Record<string, BlockInterface>;
}

export const blocksStateAtom = atom<BlockGroupsAtomInterface>({
  activeId: null,
  groupsStore: {},
  blocksStore: {},
});

export const assembledBlockGroups = atom((get): (GroupInterface | BlockInterface)[] | null => {
  const blocksState = get(blocksStateAtom);
  if (!Object.keys(blocksState.blocksStore)) return null;

  const result: (BlockInterface | GroupInterface)[] = [];

  const groups: Record<string, GroupInterface> = JSON.parse(
    JSON.stringify(blocksState.groupsStore)
  );

  const groupsArr = Object.values(groups);

  groupsArr.forEach((group) => {
    if (group.parent === null) {
      result.push(group);
    } else {
      groups[group.parent].blocks.push(group);
    }
  });

  return result;
});
