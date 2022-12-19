import React from 'react';

import { StyledBaseMain } from './styles';

export const BaseMain = ({ children }: React.PropsWithChildren) => {
  return <StyledBaseMain className="layout__main">{children}</StyledBaseMain>;
};
