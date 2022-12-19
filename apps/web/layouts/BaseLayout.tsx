import React, { PropsWithChildren } from 'react';

import { BaseFooter, BaseHeader, BaseMain, StyledPageContainer } from 'ui';

function BaseLayout({ children }: PropsWithChildren) {
  return (
    <StyledPageContainer className="layout">
      <BaseHeader />
      <BaseMain>{children}</BaseMain>
      <BaseFooter></BaseFooter>
    </StyledPageContainer>
  );
}

export default BaseLayout;
