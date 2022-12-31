import { PropsWithChildren } from 'react';

export interface ToastBoxInterface extends PropsWithChildren {
  toastId: string;
  className?: string;
  type: 'warning' | 'success' | 'error';
  title: string;
  description?: string;
}
