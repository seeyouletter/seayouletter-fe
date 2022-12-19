export interface OptionInterface {
  label: string;
  value: string;
}

export interface SelectPropsInterface {
  placeholder?: string;
  options: OptionInterface[];
}
