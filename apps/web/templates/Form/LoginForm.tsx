import React from 'react';

import { css } from '@emotion/react';

import { FormPropsInterface } from '@ui/form/types';
import { Form, globalBorder, globalTheme } from 'ui';

const loginFormCSS = (color: string) => css`
  width: 420px;
  height: 420px;
  padding: 2.5rem;

  background-color: ${color};
  border: ${globalBorder.default};
  border-radius: 20px;
`;

export function LoginForm({ children, ...props }: FormPropsInterface) {
  const theme = globalTheme;
  return (
    <Form css={loginFormCSS(theme.color.white)} {...props}>
      {children}
    </Form>
  );
}
