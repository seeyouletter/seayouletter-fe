import React from 'react';

import { useTheme } from '@emotion/react';

import {
  ColorInput,
  InputWithTitlePropsInterface,
  StackFactory,
  StackFactoryPropsInterface,
  StrongText,
} from 'ui';

interface TemplatedColorInputWithTitlePresenterInterface {
  direction: StackFactoryPropsInterface['direction'];
  title: InputWithTitlePropsInterface['title']['children'];
  width?: string;
  value: string;
  onChange: InputWithTitlePropsInterface['input']['onInput'];
  onFocus?: InputWithTitlePropsInterface['input']['onFocus'];
  onBlur?: InputWithTitlePropsInterface['input']['onBlur'];
}

/**
 * @description
 * INFO: 템플릿 만들기 페이지에서는 타이틀과 함께 주어지는 input이 상당히 많습니다. 이를 쉽게 핸들링하기 위해서 사용하는 컴포넌트입니다.
 */
export function TemplatedColorInputWithTitlePresenter({
  direction,
  title,
  width = '48px',
  value,
  onChange,
  onFocus,
  onBlur,
}: TemplatedColorInputWithTitlePresenterInterface) {
  const theme = useTheme();

  return (
    <StackFactory
      direction={direction}
      container={{
        width,
        spacing: 1,
      }}
    >
      <StrongText size={theme.fontSize.xs} color="white">
        {title}
      </StrongText>

      <ColorInput
        width="100%"
        value={value}
        size="xs"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </StackFactory>
  );
}
