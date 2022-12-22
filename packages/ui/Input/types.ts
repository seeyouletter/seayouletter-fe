import { SizeType } from '../common/types';

export interface InputPropsInterface {
  'data-testid'?: string;
  'aria-label'?: string;
  size: SizeType;
  placeholder: string;
  color?: undefined | string;
  shape?: 'Outline' | 'Filled' | 'Flushed';
  isInvalid: boolean;
}
