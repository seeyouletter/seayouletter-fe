import { atom } from 'jotai';

import { ToastBoxInterface } from '@ui/toast/types';

export interface toastAtomInterface extends ToastBoxInterface {
  toastId: string;
}

export const toastAtom = atom<toastAtomInterface[]>([]);
