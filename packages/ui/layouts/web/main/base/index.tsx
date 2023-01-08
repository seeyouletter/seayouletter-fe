import React, { PropsWithChildren } from 'react';

import { StyledBaseMainContainer, StyledBaseMainInner } from './styles';

interface BaseMainPropsInterface extends PropsWithChildren {
  isHeader?: boolean;
  isPadding?: boolean;
}
export const BaseMain = ({
  children,
  isHeader = true,
  isPadding = true,
}: BaseMainPropsInterface) => {
  return (
    <StyledBaseMainContainer className="layout__main" isHeader={isHeader}>
      <StyledBaseMainInner isPadding={isPadding}>{children}</StyledBaseMainInner>
    </StyledBaseMainContainer>
  );
};
