import { extendTheme } from '@chakra-ui/react';

import { globalColor } from './globalTheme';

export type PxType = string;
export type colorType = string;
export interface sizeInterface {
  size: PxType;
}

export interface colorInterface {
  color: colorType;
}

export const chakraTheme = extendTheme({
  colors: globalColor,
});
