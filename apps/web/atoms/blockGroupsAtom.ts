import { atom } from 'jotai';

import { BlockInterface, GroupInterface } from 'ui';

export interface BlockGroupToggleStoreInterface {
  [id: string]: boolean;
}

export interface BlockGroupsAtomInterface {
  activeId: string | null;
  groups: Record<string, GroupInterface>;
  blocks: Record<string, BlockInterface>;
}

export const blocksStateAtom = atom<BlockGroupsAtomInterface>({
  activeId: null,
  groups: {},
  blocks: {},
});

export const getBlockGroups = atom((get) => {
  const blocksState = get(blocksStateAtom);

  const result: (BlockInterface | GroupInterface)[] = [];

  const groups: Record<string, GroupInterface> = JSON.parse(JSON.stringify(blocksState.groups));

  const groupsArr = Object.values(groups);
  const blocksArr = Object.values(blocksState.blocks);

  groupsArr.forEach((group) => {
    if (group.parent === null) {
      result.push(group);
    } else {
      groups[group.parent].blocks.push(group);
    }
  });

  blocksArr.forEach((block) => {
    if (block.parent === null) {
      result.push(block);
    } else {
      groups[block.parent].blocks.push(block);
    }
  });

  return result;
});
