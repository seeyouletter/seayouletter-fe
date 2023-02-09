import { atom } from 'jotai';

export interface ResizablePageAtomState {
  width: string;
  height: string;
  top: string;
  left: string;
  scale: string;
}

export const resizablePageAtom = atom<ResizablePageAtomState>({
  width: 'auto',
  height: 'auto',
  top: '0',
  left: '0',
  scale: '1',
});
