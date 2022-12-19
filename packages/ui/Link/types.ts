import React, { PropsWithChildren } from 'react';

export interface LinkInterface extends PropsWithChildren {
  className?: string;
  href: string;
  children?: string | React.ReactNode;
  color?: string;
  noUnderline?: boolean;
}
