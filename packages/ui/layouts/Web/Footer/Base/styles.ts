import styled from '@emotion/styled';

import { CommonBaseContainerCSS, CommonBaseInnerCSS } from '@ui/layouts/web/common/base';
import { DefaultLink, ExternalLink } from '@ui/link';
import { DefaultHStack } from '@ui/stack/HStack';

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
