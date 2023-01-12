import { ReactNode } from 'react';

export interface StyledBackgroundDimInterface {
  visible: boolean;
}
export interface StyledModalContainerInterface {
  width?: string;
}

export interface ModalPropsInterface
  extends StyledBackgroundDimInterface,
    StyledModalContainerInterface {
  children?: ReactNode;
  title: string;
  descriptions: ReactNode[];

  onConfirmButtonClick: () => void;
  onCancelButtonClick: () => void;
}
