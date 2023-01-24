import React, { PropsWithChildren } from 'react';

import { StyledFullSizeMainContainer } from './styles';

interface FullSizeMainPropsInterface extends PropsWithChildren {
  isHeader?: boolean;
  backgroundColor: string;
}
export function FullSizeMain({
  children,
  backgroundColor,
  isHeader = true,
}: FullSizeMainPropsInterface) {
  return (
    <StyledFullSizeMainContainer isHeader={isHeader} backgroundColor={backgroundColor}>
      {children}
    </StyledFullSizeMainContainer>
  );
}
