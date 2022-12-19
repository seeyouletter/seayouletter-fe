import { SizeType } from 'common/types';

export interface OptionInterface {
  label: string;
  value: string;
}

export interface SelectPropsInterface {
  width?: string;
  height?: string;
  size?: SizeType;
  options: OptionInterface[];
  placeholder?: string;
  activeOption?: OptionInterface;
  /**
   *
   * @param option
   * @inner 만약 placeholder가 있다면 null이 나올 수 있습니다.
   */
  onChange: (option: OptionInterface | null) => void;
}
