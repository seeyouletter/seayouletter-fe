import { PropsWithChildren } from 'react';

export interface ToastBoxInterface extends PropsWithChildren {
  type: 'warning' | 'success' | 'error';
  title: string;
  description?: string;
}
