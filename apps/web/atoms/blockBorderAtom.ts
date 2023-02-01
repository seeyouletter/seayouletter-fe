import { atom } from 'jotai';

import {
  BorderName,
  Directions,
  DirectionsContstants,
  EdgeDirections,
  EdgeDirectionsContstants,
} from 'ui';

export interface BlockBorderStateAtomInterface {
  activeBorder: Directions | EdgeDirections | 'all';
  concurrentlyActivedSection: (EdgeDirectionsContstants | DirectionsContstants)[];
  name: BorderName;
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
