import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { StyledTabInterface, TabPropsInterface } from './types';

const StyledTab = styled.li<StyledTabInterface>`
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ tabWidth }) => tabWidth};
  height: ${({ tabHeight }) => tabHeight};

  color: ${(props) => props.theme.color.text};

  cursor: pointer;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  transition: all 0.3s;

  ${({ isActive, theme }) =>
    isActive
      ? css`
          color: ${theme.color.white};
        `
      : css`
          &:hover {
            background-color: ${theme.color.sub[200]};
          }
        `}
`;

export const Tab = ({ isActive, tabWidth, tabHeight, children, onClick }: TabPropsInterface) => {
  return (
    <StyledTab isActive={isActive} onClick={onClick} tabWidth={tabWidth} tabHeight={tabHeight}>
      {children}
    </StyledTab>
  );
};
