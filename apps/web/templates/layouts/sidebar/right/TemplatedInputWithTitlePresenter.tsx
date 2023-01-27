import React from 'react';

import { useTheme } from '@emotion/react';

import { InputWithTitle, InputWithTitlePropsInterface } from 'ui';

interface TemplatedInputWithTitlePresenterPropsInterface {
  title: InputWithTitlePropsInterface['title']['children'];
  placeholder: InputWithTitlePropsInterface['input']['placeholder'];
  inputWidth?: string;
  value?: string;
  onChange: InputWithTitlePropsInterface['input']['onInput'];
}

export function TemplatedInputWithTitlePresenter({
  title,
  inputWidth,
  placeholder,
  value,
  onChange,
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
        width: inputWidth ?? '60px',
        size: 'xs',
        placeholder,
        onChange,
        value,
        bgColor: theme.color.darkGray,
        borderColor: theme.color.darkGray,
        padding: '4px',
        color: theme.color.white,
      }}
    />
  );
}
