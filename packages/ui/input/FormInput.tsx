import React, { useRef, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Input } from '@chakra-ui/react';

import { globalTheme } from '@ui/styles';
import { DefaultText } from '@ui/text/Default';

import { InputPropsInterface } from './types';

interface StyledInputContainerInterface {
  flexShrink?: boolean;
}

type FormInputPropsInterface = InputPropsInterface & StyledInputContainerInterface;

const StyledInputContiainer = styled.div<StyledInputContainerInterface>`
  flex: 1;

  ${({ flexShrink }) =>
    flexShrink &&
    css`
      flex-shrink: 0;
    `}
`;

export const FormInput = ({
  size = 'md',
  shape = 'flushed',
  placeholder,
  color,
  isInvalid = false,
  onInput,
  errorMessage,
  flexShrink,
  ...props
}: FormInputPropsInterface) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const nowLength = (inputRef.current as HTMLInputElement)?.value.length ?? 0;

  return (
    <StyledInputContiainer flexShrink={flexShrink}>
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
        {...props}
      />

      <DefaultText
        css={css`
          height: ${globalTheme.fontSize.sm};
          margin-top: 8px;
        `}
        visible={isInvalid && !!nowLength && !focused && !!errorMessage}
        as="div"
        size={globalTheme.fontSize.sm}
        color={globalTheme.color.error}
      >
        {errorMessage} {JSON.stringify(!nowLength)}
      </DefaultText>
    </StyledInputContiainer>
  );
};
