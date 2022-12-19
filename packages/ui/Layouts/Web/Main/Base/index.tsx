import React from 'react';

import { StyledBaseMainContainer, StyledBaseMainInner } from './styles';

export const BaseMain = ({ children }: React.PropsWithChildren) => {
  return (
    <StyledBaseMainContainer className="layout__main">
      <StyledBaseMainInner>{children}</StyledBaseMainInner>
    </StyledBaseMainContainer>
  );
};
