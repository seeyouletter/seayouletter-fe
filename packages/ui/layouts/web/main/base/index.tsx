import React, { PropsWithChildren } from 'react';

import { StyledBaseMainContainer, StyledBaseMainInner } from './styles';

interface BaseMainPropsInterface extends PropsWithChildren {
  isHeader?: boolean;
}
export const BaseMain = ({ children, isHeader = true }: BaseMainPropsInterface) => {
  return (
    <StyledBaseMainContainer className="layout__main" isHeader={isHeader}>
      <StyledBaseMainInner>{children}</StyledBaseMainInner>
    </StyledBaseMainContainer>
  );
};
