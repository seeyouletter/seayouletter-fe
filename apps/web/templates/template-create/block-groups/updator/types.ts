import { MouseEvent } from 'react';

import { DirectionsConstants, EdgeDirectionsConstants } from 'ui';

export interface LineInterface {
  direction: DirectionsConstants;
  onMouseDown: (e: MouseEvent) => void;
  onMouseUp: () => void;
}

export interface EdgeInterface {
  direction: EdgeDirectionsConstants;
  onMouseDown: (e: MouseEvent) => void;
  onMouseUp: () => void;
}
