import { globalTheme } from './globalTheme';

export type PxType = string;
export type colorType = string;
export interface sizeInterface {
  size: PxType;
}

export interface colorInterface {
  color: colorType;
}

export const chakraTheme = {
  colors: globalTheme.color,
};
