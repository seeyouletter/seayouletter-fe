import { atom } from 'jotai';

type MouseStateAtomPosition = number;

export interface MouseStateAtomInterface {
  moveActived: boolean;
  x: MouseStateAtomPosition;
  y: MouseStateAtomPosition;
  throttle: boolean;
}

export const mouseStateAtom = atom<MouseStateAtomInterface>({
  moveActived: false,
  x: 0,
  y: 0,
  throttle: true,
});
