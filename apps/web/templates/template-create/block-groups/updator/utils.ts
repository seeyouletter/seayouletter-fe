import { DirectionsConstants, EdgeDirectionsConstants } from 'ui';

/**
 * INFO: Line
 */

export const lineCursors = {
  [DirectionsConstants.top]: 'ns-resize',
  [DirectionsConstants.right]: 'ew-resize',
  [DirectionsConstants.bottom]: 'ns-resize',
  [DirectionsConstants.left]: 'ew-resize',
} as const;

export const lineTops = {
  [DirectionsConstants.top]: '-1px',
  [DirectionsConstants.right]: '0',
  [DirectionsConstants.bottom]: '100%',
  [DirectionsConstants.left]: '0',
} as const;

export const lineLefts = {
  [DirectionsConstants.top]: '0',
  [DirectionsConstants.right]: '100%',
  [DirectionsConstants.bottom]: '-1px',
  [DirectionsConstants.left]: '-1px',
} as const;

export const lineWidths = {
  [DirectionsConstants.top]: '100%',
  [DirectionsConstants.right]: '2px',
  [DirectionsConstants.bottom]: '100%',
  [DirectionsConstants.left]: '2px',
} as const;

export const lineHeights = {
  [DirectionsConstants.top]: '2px',
  [DirectionsConstants.right]: '100%',
  [DirectionsConstants.bottom]: '2px',
  [DirectionsConstants.left]: '100%',
} as const;

/**
 * INFO: Edge
 */

export const edgeCursors = {
  [EdgeDirectionsConstants.topLeft]: 'nwse-resize',
  [EdgeDirectionsConstants.topRight]: 'nesw-resize',
  [EdgeDirectionsConstants.bottomRight]: 'nwse-resize',
  [EdgeDirectionsConstants.bottomLeft]: 'nesw-resize',
} as const;

export const edgeTops = {
  [EdgeDirectionsConstants.topLeft]: '-3px',
  [EdgeDirectionsConstants.topRight]: '-3px',
  [EdgeDirectionsConstants.bottomRight]: 'calc(100% - 3px)',
  [EdgeDirectionsConstants.bottomLeft]: 'calc(100% - 3px)',
} as const;

export const edgeLefts = {
  [EdgeDirectionsConstants.topLeft]: '-3px',
  [EdgeDirectionsConstants.topRight]: 'calc(100% - 3px)',
  [EdgeDirectionsConstants.bottomRight]: 'calc(100% - 3px)',
  [EdgeDirectionsConstants.bottomLeft]: '-3px',
} as const;
