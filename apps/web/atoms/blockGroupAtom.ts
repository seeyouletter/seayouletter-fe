import { atom } from 'jotai';

import { GroupInterface } from 'ui';

export interface BlockGroupToggleStoreInterface {
  [id: string]: boolean;
}

export interface BlockGroupAtomInterface {
  activeId: string | null;
  toggleStore: BlockGroupToggleStoreInterface | null;
  blockGroups: GroupInterface[];
}

export const blockGroupStateAtom = atom<BlockGroupAtomInterface>({
  activeId: null,
  toggleStore: null,
  blockGroups: [],
});
