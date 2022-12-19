import styled from '@emotion/styled';

import { CommonBaseContainerCSS, CommonBaseInnerCSS } from '../../common/base';

export const StyledFooterContainer = styled.footer`
  ${(props) => CommonBaseContainerCSS(props.theme.color.sub[500])};

  height: ${(props) => props.theme.layouts.footer.height};
  background-color: ${(props) => props.theme.color.sub[500]};
`;

export const StyledFooterInner = styled.div`
  ${CommonBaseInnerCSS}
`;
