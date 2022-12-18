import { PropsWithChildren } from 'react';

export interface LinkInterface extends PropsWithChildren {
  href: string;
  children: string;
  color?: string;
}
