import React from 'react';

import { useTheme } from '@emotion/react';

import { InputWithTitle, InputWithTitlePropsInterface } from 'ui';

interface TemplatedInputWithTitlePresenterPropsInterface {
  direction: InputWithTitlePropsInterface['direction'];
  title: InputWithTitlePropsInterface['title']['children'];
  placeholder: InputWithTitlePropsInterface['input']['placeholder'];
  inputWidth?: string;
  value?: string;
  onChange: InputWithTitlePropsInterface['input']['onInput'];
  onBlur: InputWithTitlePropsInterface['input']['onBlur'];
}

/**
 * @description
 * INFO: 템플릿 만들기 페이지에서는 타이틀과 함께 주어지는 input이 상당히 많습니다.
 * 이를 쉽게 핸들링하기 위해서 사용하는 컴포넌트입니다.
 */
export function TemplatedInputWithTitlePresenter({
  direction,
  title,
  inputWidth,
  placeholder,
  value,
  onChange,
  onBlur,
}: TemplatedInputWithTitlePresenterPropsInterface) {
  const theme = useTheme();

  const getChangedContainerProps = (
    direction: TemplatedInputWithTitlePresenterPropsInterface['direction']
  ) => {
    return direction === 'vertical'
      ? {
          justifyContent: 'center',
          alignItems: 'flex-start',
        }
      : {
          justifyContent: 'flex-start',
          alignItems: 'center',
        };
  };

  return (
    <InputWithTitle
      direction={direction}
      container={{
        spacing: 1,
        ...getChangedContainerProps(direction),
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
        onBlur,
        value,
        bgColor: theme.color.darkGray,
        borderColor: theme.color.darkGray,
        padding: '4px',
        color: theme.color.white,
      }}
    />
  );
}
