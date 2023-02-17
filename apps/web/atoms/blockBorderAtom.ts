import { atom } from 'jotai';

import {
  BorderName,
  Directions,
  DirectionsConstants,
  EdgeDirections,
  EdgeDirectionsConstants,
} from 'ui';

export interface BlockBorderStateAtomInterface {
  activeBorder: Directions | EdgeDirections | 'all';
  concurrentlyActivedSection: (EdgeDirectionsConstants | DirectionsConstants)[];
  name: BorderName;
}

export const concurrentlyActivedSections = {
  all: [
    DirectionsConstants.top,
    DirectionsConstants.bottom,
    DirectionsConstants.left,
    DirectionsConstants.right,
    EdgeDirectionsConstants.topLeft,
    EdgeDirectionsConstants.topRight,
    EdgeDirectionsConstants.bottomLeft,
    EdgeDirectionsConstants.bottomRight,
  ],

  top: [DirectionsConstants.top, EdgeDirectionsConstants.topLeft, EdgeDirectionsConstants.topRight],
  bottom: [
    DirectionsConstants.bottom,
    EdgeDirectionsConstants.bottomLeft,
    EdgeDirectionsConstants.bottomRight,
  ],
  left: [
    DirectionsConstants.left,
    EdgeDirectionsConstants.topLeft,
    EdgeDirectionsConstants.bottomLeft,
  ],
  right: [
    DirectionsConstants.right,
    EdgeDirectionsConstants.topRight,
    EdgeDirectionsConstants.bottomRight,
  ],

  topLeft: [EdgeDirectionsConstants.topLeft],
  topRight: [EdgeDirectionsConstants.topRight],
  bottomLeft: [EdgeDirectionsConstants.bottomLeft],
  bottomRight: [EdgeDirectionsConstants.bottomRight],
};

export const blockBorderStateAtom = atom<BlockBorderStateAtomInterface>({
  activeBorder: 'all',
  name: BorderName.all,
  concurrentlyActivedSection: concurrentlyActivedSections.all,
});
