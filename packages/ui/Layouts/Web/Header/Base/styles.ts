import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { CommonBaseInnerCSS } from '../../common/base';

export const BaseHeaderContainer = styled.header`
  position: fixed;

  top: 0;
  right: 0;
  left: 0;

  z-index: 1000;

  display: flex;
  align-items: center;

  width: 100%;
  height: 60px;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
`;

export const BaseHeaderInner = styled.div`
  ${CommonBaseInnerCSS}
`;
