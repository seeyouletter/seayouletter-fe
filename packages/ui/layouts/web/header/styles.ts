/**
 * NOTE:
 * pnpm에서 모노레포에 관한 심볼릭 링크 오류 관련해서 해결할 때까지 이 패턴을 유지한다.
 * 추후 해결될 시  `import type {}`을 통해 모든 문장을 제거한다.
 *
 * @see: https://github.com/microsoft/TypeScript/issues/47663
 */
import type {} from 'node_modules/@types/react';

import styled from '@emotion/styled';

import { DefaultLink } from '../../../link';
import { CommonBaseInnerCSS } from '../common/base';

export const CommonHeaderContainer = styled.header`
  position: fixed;

  top: 0;
  right: 0;
  left: 0;

  z-index: 1000;

  height: 60px;
  background-color: ${(props) => props.theme.color.white};

  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
`;

export const CommonHeaderInner = styled.div`
  ${CommonBaseInnerCSS}

  display: flex;
  align-items: center;

  height: 100%;
`;

export const StyledPageLinks = styled.nav`
  display: flex;
  justify-content: space-between;

  width: 540px;

  margin: 0 auto;
`;

export const StyledUserMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  background-color: white;

  border: ${(props) => props.theme.border.default};

  border-radius: 50%;
`;

export const StyledPageLink = styled(DefaultLink)`
  &:hover,
  &:focus,
  &:active {
    font-weight: 700;
  }
  &:active {
    transform: scale(0.98);
  }
`;
