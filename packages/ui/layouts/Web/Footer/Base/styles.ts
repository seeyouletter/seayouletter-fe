import styled from '@emotion/styled';

import { DefaultLink, ExternalLink } from '../../../../link';
import DefaultHStack from '../../../../stack/HStack';
import { CommonBaseContainerCSS, CommonBaseInnerCSS } from '../../common/base';

export const StyledFooterContainer = styled.footer`
  ${(props) => CommonBaseContainerCSS(props.theme.color.sub[500])};

  height: ${(props) => props.theme.layout.footer.height};

  padding-top: 24px;

  background-color: ${(props) => props.theme.color.sub[500]};
`;

export const StyledFooterInner = styled.div`
  ${CommonBaseInnerCSS}
`;

export const StyledLinks = styled(DefaultHStack)`
  margin-top: 16px;
`;

export const StyledDefaultLink = styled(DefaultLink)`
  font-size: 12px;
`;

export const StyledExternalLink = styled(ExternalLink)`
  font-size: 12px;
`;
