import { InputPropsInterface } from '@ui/input/types';
import { DefaultHStackInterface, DefaultVStackInterface } from '@ui/stack';
import { DefaultTextPropsInterface } from '@ui/text';

export interface InputWithTitlePropsInterface {
  direction: 'vertical' | 'horizontal';
  container: DefaultHStackInterface | DefaultVStackInterface;
  title: DefaultTextPropsInterface;
  input: InputPropsInterface;
}
