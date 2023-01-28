import { atom } from 'jotai';

import { Directions, EdgeDirections } from 'ui';

export interface BlockBorderStateAtomInterface {
  activeBorder: Directions | EdgeDirections | 'all';
  concurrentlyActivedSection: (EdgeDirectionsContstants | DirectionsContstants)[];
  name: BorderName;
}

export enum DirectionsContstants {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

export enum EdgeDirectionsContstants {
  topLeft = 'topLeft',
  topRight = 'topRight',
  bottomLeft = 'bottomLeft',
  bottomRight = 'bottomRight',
}

export enum BorderName {
  all = '전체',

  top = '위',
  bottom = '아래',
  left = '왼쪽',
  right = '오른쪽',

  topLeft = '왼쪽 위',
  topRight = '오른쪽 위',
  bottomLeft = '왼쪽 아래',
  bottomRight = '오른쪽 아래',
}

export const concurrentlyActivedSections = {
  all: [
    DirectionsContstants.top,
    DirectionsContstants.bottom,
    DirectionsContstants.left,
    DirectionsContstants.right,
    EdgeDirectionsContstants.topLeft,
    EdgeDirectionsContstants.topRight,
    EdgeDirectionsContstants.bottomLeft,
    EdgeDirectionsContstants.bottomRight,
  ],

  top: [
    DirectionsContstants.top,
    EdgeDirectionsContstants.topLeft,
    EdgeDirectionsContstants.topRight,
  ],
  bottom: [
    DirectionsContstants.bottom,
    EdgeDirectionsContstants.bottomLeft,
    EdgeDirectionsContstants.bottomRight,
  ],
  left: [
    DirectionsContstants.left,
    EdgeDirectionsContstants.topLeft,
    EdgeDirectionsContstants.bottomLeft,
  ],
  right: [
    DirectionsContstants.right,
    EdgeDirectionsContstants.topRight,
    EdgeDirectionsContstants.bottomRight,
  ],

  topLeft: [EdgeDirectionsContstants.topLeft],
  topRight: [EdgeDirectionsContstants.topRight],
  bottomLeft: [EdgeDirectionsContstants.bottomLeft],
  bottomRight: [EdgeDirectionsContstants.bottomRight],
};

export const blockBorderStateAtom = atom<BlockBorderStateAtomInterface>({
  activeBorder: 'all',
  name: BorderName.all,
  concurrentlyActivedSection: concurrentlyActivedSections.all,
});
