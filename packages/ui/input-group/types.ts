import { InputPropsInterface } from '@ui/input/types';
import { DefaultHStackInterface } from '@ui/stack';
import { DefaultTextPropsInterface } from '@ui/text';

export interface InputWithTitlePropsInterface {
  container: DefaultHStackInterface;
  title: DefaultTextPropsInterface;
  input: InputPropsInterface;
}
