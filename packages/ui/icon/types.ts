import { PropsWithChildren } from 'react';

export interface IconInterface {
  size?: string;
}

export interface DefaultIconInterface extends PropsWithChildren {
  viewBox: string;
  width: string;
  height: string;
}
