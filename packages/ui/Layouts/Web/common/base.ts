import { css } from '@emotion/react';

export const CommonBaseContainerCSS = (color = '#ddd') => css`
  background-color: ${color};
`;

export const CommonBaseInnerCSS = css`
  width: 1024px;
  padding: 0 32px;
  margin: 0 auto;
`;
