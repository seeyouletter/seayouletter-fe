/**
 * NOTE:
 * pnpm에서 모노레포에 관한 심볼릭 링크 오류 관련해서 해결할 때까지 이 패턴을 유지한다.
 * 추후 해결될 시  `import type {}`을 통해 모든 문장을 제거한다.
 *
 * @see: https://github.com/microsoft/TypeScript/issues/47663
 */
import type {} from 'node_modules/@types/react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { CommonBaseContainerCSS, CommonBaseInnerCSS } from '../../common/base';

export const StyledBaseMainContainer = styled.main<{ isHeader: boolean }>`
  ${(props) => CommonBaseContainerCSS(props.theme.color.sub[200])}

  height: auto;
  min-height: 100vh;

  ${({ theme, isHeader }) =>
    isHeader &&
    css`
      padding-top: ${theme.layout.header.height};
    `}
`;

export const StyledBaseMainInner = styled.div<{ isPadding: boolean }>`
  ${CommonBaseInnerCSS}

  height: 100%;
  min-height: 100vh;

  background-color: ${(props) => props.theme.color.layout.page};

  ${({ isPadding }) =>
    !isPadding &&
    css`
      padding: 0;
    `};
`;
