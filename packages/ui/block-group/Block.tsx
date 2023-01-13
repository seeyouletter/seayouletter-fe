import React, { MouseEvent } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { BlockPropsInterface, CommonStyledBlockInterface } from './types';

const StyledBlockContainer = styled.div<CommonStyledBlockInterface>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
  padding-left: 20px;
  cursor: pointer;

  ${({ actived, theme }) =>
    actived &&
    css`
      background-color: ${theme.color.layout.blockGroupToggle.activeBg};
    `}
  &:hover {
    background-color: ${(props) => props.theme.color.layout.blockGroupToggle.activeBg};
  }
`;

export default function Block({ id, title, onBlockClick, activeId }: BlockPropsInterface) {
  const actived = activeId === id;

  return (
    <StyledBlockContainer onClick={(e: MouseEvent) => onBlockClick(e, id)} actived={actived}>
      {title}
    </StyledBlockContainer>
  );
}
