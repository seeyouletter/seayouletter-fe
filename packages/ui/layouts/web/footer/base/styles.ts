/**
 * NOTE:
 * pnpm에서 모노레포에 관한 심볼릭 링크 오류 관련해서 해결할 때까지 이 패턴을 유지한다.
 * 추후 해결될 시  `import type {}`을 통해 모든 문장을 제거한다.
 *
 * @see: https://github.com/microsoft/TypeScript/issues/47663
 */
import type {} from 'node_modules/@types/react';

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
