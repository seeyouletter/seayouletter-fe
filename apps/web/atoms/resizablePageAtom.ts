import { atom } from 'jotai';

export interface ResizablePageAtomState {
  width: string;
  height: string;
  scale: string;
}

export const resizablePageAtom = atom<ResizablePageAtomState>({
  width: 'auto',
  height: 'auto',
  scale: '1',
});
