import { PropsWithChildren } from 'react';

export interface FormPropsInterface extends PropsWithChildren {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
}
