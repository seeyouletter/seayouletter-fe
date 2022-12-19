import React, { PropsWithChildren } from 'react';

export interface LinkInterface extends PropsWithChildren {
  href: string;
  children?: string | React.ReactNode;
  color?: string;
}
