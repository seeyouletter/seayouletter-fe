import styled from '@emotion/styled';

import { CommonBaseContainerCSS, CommonBaseInnerCSS } from '../../common/base';

export const StyledBaseMainContainer = styled.main`
  ${(props) => CommonBaseContainerCSS(props.theme.color.sub[200])}

  height: 100%;

  padding-top: ${(props) => props.theme.layouts.header.height};
`;

export const StyledBaseMainInner = styled.main`
  ${CommonBaseInnerCSS}

  flex: 1;

  min-height: 100%;

  padding-top: ${(props) => props.theme.layouts.header.height};

  background-color: ${(props) => props.theme.color.layouts.page};
`;
