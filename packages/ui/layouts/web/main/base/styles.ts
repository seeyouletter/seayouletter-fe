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
    isPadding &&
    css`
      padding: 0;
    `};
`;
