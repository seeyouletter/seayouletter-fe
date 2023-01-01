import { PropsWithChildren } from 'react';

export interface BoxListTopPropsInterface {
  transitionDuration?: number;
  containerKey: string;
  toastList: ToastBoxInterface[];
  isHeader?: boolean;
}
export interface ToastBoxInterface extends PropsWithChildren {
  transitionDuration?: number;
  isUnmounted?: boolean;
  toastId: string;
  className?: string;
  type: 'warning' | 'success' | 'error';
  title: string;
  description?: string;
}
