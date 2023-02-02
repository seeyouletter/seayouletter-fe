import React, { PropsWithChildren } from 'react';

import { SizeType } from '@ui/types/models/Styles';

import { StyledFullSizeMainContainer } from './styles';

interface FullSizeMainPropsInterface extends PropsWithChildren {
  width: SizeType;
  height: SizeType;
  isHeader?: boolean;
  backgroundColor: string;
}
export function FullSizeMain({
  width,
  height,
  children,
  backgroundColor,
  isHeader = true,
}: FullSizeMainPropsInterface) {
  return (
    <StyledFullSizeMainContainer
      width={width}
      height={height}
      isHeader={isHeader}
      backgroundColor={backgroundColor}
    >
      {children}
    </StyledFullSizeMainContainer>
  );
}
