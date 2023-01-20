import React, { PropsWithChildren } from 'react';

import { CommonHeaderContainer, CommonHeaderInner } from '../styles';

export function TemplateCreateHeader({ children }: PropsWithChildren) {
  return (
    <CommonHeaderContainer>
      <CommonHeaderInner>{children}</CommonHeaderInner>
    </CommonHeaderContainer>
  );
}
