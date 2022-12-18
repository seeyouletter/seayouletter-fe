import { SizeType } from '../common/types';

export interface InputPropsInterface {
  size: SizeType;
  placeholder: string;
  color?: undefined | string;
  shape: 'Outline' | 'Filled' | 'Flushed';
  isInvalid: boolean;
}
