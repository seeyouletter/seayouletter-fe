import React, { PropsWithChildren } from 'react';

import { useTheme } from '@emotion/react';

import { DefaultBox } from '@ui/box';

interface LeftSidebarPropsInterface extends PropsWithChildren {
  actived: boolean;
}
export function RightSidebar({ actived, children }: LeftSidebarPropsInterface) {
  const theme = useTheme();

  return (
    <DefaultBox
      position="fixed"
      top={
        +theme.layout.header.height.replace(/[^0-9]/g, '') +
        +theme.layout.templateCreateToolbar.height.replace(/[^0-9]/g, '') +
        'px'
      }
      right="0"
      width="260px"
      height={`calc(100% - ${theme.layout.header.height})`}
      zIndex="1000"
      transform={`translateX(${actived ? '0' : '-100%'})`}
      transition="all 0.3s"
      backgroundColor={theme.color.dark}
    >
      {children}
    </DefaultBox>
  );
}
