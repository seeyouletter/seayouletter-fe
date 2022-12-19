import React, { PropsWithChildren } from 'react';

function BaseLayout({ children }: PropsWithChildren) {
  return <main>{children}</main>;
}

export default BaseLayout;
