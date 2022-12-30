import styled from '@emotion/styled';

import { CommonBaseContainerCSS, CommonBaseInnerCSS } from '../../common/base';

export const StyledBaseMainContainer = styled.main`
  ${(props) => CommonBaseContainerCSS(props.theme.color.sub[200])}

  height: auto;
  min-height: 100%;

  padding-top: ${(props) => props.theme.layout.header.height};
`;

export const StyledBaseMainInner = styled.div`
  ${CommonBaseInnerCSS}

  flex: 1;

  min-height: 100vh;

  padding-top: ${(props) => props.theme.layout.header.height};
  padding-bottom: ${(props) => props.theme.layout.header.height};

  background-color: ${(props) => props.theme.color.layout.page};
`;
