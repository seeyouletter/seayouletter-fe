import React from 'react';

import { DefaultInput } from '@ui/input/Default';
import { DefaultHStack } from '@ui/stack';
import { DefaultText } from '@ui/text';

import { InputWithTitlePropsInterface } from './types';

export function InputWithTitle({ container, title, input }: InputWithTitlePropsInterface) {
  return (
    <DefaultHStack {...container}>
      <DefaultText {...title} />
      <DefaultInput {...input} />
    </DefaultHStack>
  );
}
