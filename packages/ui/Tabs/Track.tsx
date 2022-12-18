import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { StyledTabTrackInterface } from './types';

export const TabTrack = styled.div<StyledTabTrackInterface>`
  position: absolute;
  z-index: 0;

  width: ${({ tabWidth }) => tabWidth};
  height: ${({ tabHeight }) => tabHeight};

  background-color: ${(props) => props.theme.color.primary[500]};

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  transition: all 0.3s;

  ${({ index }) =>
    index &&
    css`
      transform: translateX(calc(${index} * 100%));
    `}
`;
