import React from 'react';

import { css, useTheme } from '@emotion/react';

import { Form, FormPropsInterface } from 'ui';

const configFormCSS = (color: string, border: string) => css`
  width: 420px;
  padding: 2.5rem;

  background-color: ${color};
  border: ${border};
  border-radius: 20px;
`;

export function ConfigForm({ children, ...props }: FormPropsInterface) {
  const theme = useTheme();
  return (
    <Form css={configFormCSS(theme.color.white, theme.border.default)} {...props}>
      {children}
    </Form>
  );
}
