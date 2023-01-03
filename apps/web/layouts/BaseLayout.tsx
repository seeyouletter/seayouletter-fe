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
    href: '/create',
    children: '청첩장 제작',
  },
  {
    href: '/lists',
    children: '청첩장 모음',
  },
];

const footerLinksData = [
  {
    name: '씨유레터',
    links: [
      {
        href: '/about/culture',
        label: '문화',
      },
      {
        href: '/about/culture',
        label: '히스토리',
      },
      {
        href: '/about/culture',
        label: '씨유레터',
      },
    ],
  },
  {
    name: '소식',
    links: [
      {
        href: '/event',
        label: '이벤트',
      },
      {
        href: '/notice',
        label: '공지사항',
      },
      {
        href: '/update',
        label: '업데이트',
      },
    ],
  },
  {
    name: '기술과 서비스',
    links: [
      {
        href: '/terms-of-agreement',
        label: '이용약관',
      },
      {
        href: '/FAQ',
        label: 'FAQ',
      },
      {
        href: '/customer-service',
        label: '고객센터',
      },
      {
        href: '/private-info-administration',
        label: '개인정보 처리방침',
      },
      {
        href: '/report',
        label: '권리침해 신고안내',
      },
    ],
  },
  {
    name: '참고',
    links: [
      {
        href: 'https://github.com/seeyouletter',
        label: 'GitHub',
      },
      {
        href: 'https://github.com/seeyouletter/seeyouletter-fe',
        label: 'FE',
      },
      {
        href: 'https://github.com/seeyouletter/seeyouletter-be',
        label: 'BE',
      },
    ],
  },
];

interface BaseLayoutPropsInterface extends PropsWithChildren {
  isHeader?: boolean;
}
function BaseLayout({ children, isHeader = true }: BaseLayoutPropsInterface) {
  return (
    <StyledPageContainer className="layout">
      {isHeader && (
        <BaseHeader
          logoLink={logoLinkData}
          pageLinks={pageLinksData}
          user={{
            profileUrl:
              'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/145.jpg',
          }}
        />
      )}
      <BaseMain isHeader={isHeader}>{children}</BaseMain>
      <BaseFooter footerLinks={footerLinksData}></BaseFooter>
    </StyledPageContainer>
  );
}

export default BaseLayout;
