import React, { FormEvent } from 'react';

import { SizeType } from '../common/types';

export interface InputPropsInterface {
  'data-testid'?: string;
  'aria-label'?: string;
  size: SizeType;
  placeholder: string;
  color?: undefined | string;
  shape?: 'outline' | 'filled' | 'flushed';
  isInvalid: boolean;
  onInput?: (e: FormEvent) => void;
  errorMessage?: string | React.ReactNode;
}
