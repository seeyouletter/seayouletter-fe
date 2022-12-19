import React, { PropsWithChildren } from 'react';

import { BaseFooter, BaseHeader, BaseMain, StyledPageContainer } from 'ui';

export const logoLinkData = {
  href: '/',
};

export const pageLinksData = [
  {
    href: '/about',
    children: '씨유레터는',
  },
  {
    href: '/find',
    children: '청첩장 찾기',
  },
  {
    href: '/about',
    children: '청첩장 제작',
  },
  {
    href: '/about',
    children: '청첩장 모음',
  },
];

function BaseLayout({ children }: PropsWithChildren) {
  return (
    <StyledPageContainer className="layout">
      <BaseHeader
        logoLink={logoLinkData}
        pageLinks={pageLinksData}
        user={{
          profileUrl:
            'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/145.jpg',
        }}
      />
      <BaseMain>{children}</BaseMain>
      <BaseFooter></BaseFooter>
    </StyledPageContainer>
  );
}

export default BaseLayout;
