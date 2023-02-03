import { atom } from 'jotai';

export const initialBlockCreationState = {
  type: null,
  width: 50,
  height: 50,
  top: 0,
  left: 0,
};

export interface TemplateCreateToolbarAtomInterface {
  blockCreation: {
    type: null | 'text' | 'block';
    width: number;
    height: number;
    top: number;
    left: number;
  };
}
/**
 * description:
 * blockCreation: <블록 생성>이며, 초깃값은 너비/높이 100씩 한다. 판별은 type === null이면 생성하지 않는 것으로 한다.
 */
export const templateCreateToolbarAtom = atom<TemplateCreateToolbarAtomInterface>({
  blockCreation: initialBlockCreationState,
});
