import React from 'react';

import { css, useTheme } from '@emotion/react';

import { FormPropsInterface } from '@ui/form/types';
import { Form } from 'ui';

const loginFormCSS = (color: string, border: string) => css`
  width: 420px;
  height: 420px;
  padding: 2.5rem;

  background-color: ${color};
  border: ${border};
  border-radius: 20px;
`;

export function LoginForm({ children, ...props }: FormPropsInterface) {
  const theme = useTheme();
  return (
    <Form css={loginFormCSS(theme.color.white, theme.border.default)} {...props}>
      {children}
    </Form>
  );
}
