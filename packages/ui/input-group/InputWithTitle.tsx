import React from 'react';

import { DefaultInput } from '@ui/input/Default';
import { StackFactory } from '@ui/stack';
import { DefaultText } from '@ui/text';

import { InputWithTitlePropsInterface } from './types';

export function InputWithTitle({
  direction,
  container,
  title,
  input,
}: InputWithTitlePropsInterface) {
  return (
    <StackFactory direction={direction} container={container}>
      <DefaultText flexShrink {...title} />
      <DefaultInput {...input} />
    </StackFactory>
  );
}
