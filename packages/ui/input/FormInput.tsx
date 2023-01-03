import React, { useRef, useState } from 'react';

import { css } from '@emotion/react';

import { Input } from '@chakra-ui/react';

import { globalTheme } from '@ui/styles';
import { DefaultText } from '@ui/text/Default';

import { InputPropsInterface } from './types';

export const FormInput = ({
  size = 'md',
  shape = 'flushed',
  placeholder,
  color,
  isInvalid = false,
  onInput,
  errorMessage,
  ...props
}: InputPropsInterface) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const nowLength = (inputRef.current as HTMLInputElement)?.value.length ?? 0;

  return (
    <div>
      <Input
        ref={inputRef}
        data-testid={props['data-testid']}
        aria-label={props['aria-label']}
        size={size}
        variant={shape}
        color={color}
        placeholder={placeholder}
        _placeholder={{ color: 'inherit', opacity: 0.5 }}
        errorBorderColor="error"
        focusBorderColor="primary.500"
        isInvalid={!!nowLength && isInvalid}
        onInput={onInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      <DefaultText
        css={css`
          height: ${globalTheme.fontSize.sm};
          margin-top: 8px;
        `}
        visible={!!nowLength && !focused && !!errorMessage}
        as="div"
        size={globalTheme.fontSize.sm}
        color={globalTheme.color.error}
      >
        {errorMessage}
      </DefaultText>
    </div>
  );
};
