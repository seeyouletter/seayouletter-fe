import React, { FormEvent } from 'react';

import { SizeType } from '../common/types';

export interface ColorPropsInterface extends Omit<InputPropsInterface, 'placeholder'> {
  value: string;
}

export interface InputPropsInterface {
  'data-testid'?: string;
  'aria-label'?: string;
  size: SizeType;
  placeholder: string;
  color?: undefined | string;
  shape?: 'outline' | 'filled' | 'flushed';
  isInvalid?: boolean;
  onInput?: (e: FormEvent) => void;
  onFocus?: (e: FormEvent) => void;
  onBlur?: (e: FormEvent) => void;
  onChange?: (e: FormEvent) => void;
  errorMessage?: string | React.ReactNode;
  borderColor?: string;
  width?: string;
  bgColor?: string;
  padding?: string;
  value?: string;
}
