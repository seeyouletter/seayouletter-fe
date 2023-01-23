import React from 'react';

import { useTheme } from '@emotion/react';

import { InputWithTitle, InputWithTitlePropsInterface } from 'ui';

interface TemplatedInputWithTitlePresenterPropsInterface {
  title: InputWithTitlePropsInterface['title']['children'];
  placeholder: InputWithTitlePropsInterface['input']['placeholder'];
  onInput: InputWithTitlePropsInterface['input']['onInput'];
}

export function TemplatedInputWithTitlePresenter({
  title,
  placeholder,
  onInput,
}: TemplatedInputWithTitlePresenterPropsInterface) {
  const theme = useTheme();

  return (
    <InputWithTitle
      container={{
        spacing: 2,
        alignItems: 'center',
      }}
      title={{
        color: theme.color.white,
        size: theme.fontSize.xs,
        bold: true,
        children: title,
      }}
      input={{
        width: '60px',
        size: 'xs',
        placeholder,
        onInput,
        bgColor: theme.color.darkGray,
        borderColor: theme.color.darkGray,
        padding: '4px',
      }}
    />
  );
}
