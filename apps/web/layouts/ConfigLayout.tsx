import React, { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import { PrevButton } from '@templates/index';

import { StyledPageContainer } from 'ui';

const StyledHeaderContainer = styled.header`
  position: fixed;

  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.layout.header.height};
  background-color: ${({ theme }) => theme.color.layout.page};
`;

const StyledMain = styled.main`
  flex: 1;
  min-height: 100%;
  padding-top: ${({ theme }) => theme.layout.header.height};
`;

export default function ConfigLayout({ children }: PropsWithChildren) {
  return (
    <StyledPageContainer>
      <StyledHeaderContainer>
        <PrevButton />
      </StyledHeaderContainer>
      <StyledMain>{children}</StyledMain>
    </StyledPageContainer>
  );
}
