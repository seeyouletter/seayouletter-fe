import React from 'react';

import { IconButton, NaverIcon } from 'ui';

import { OAuthLinkButtonInterface } from './types';

export function Naver({ onClick }: OAuthLinkButtonInterface) {
  return (
    <IconButton
      role="link"
      ariaLabel="네이버 로그인 링크"
      size="lg"
      icon={<NaverIcon size="48px" />}
      colorScheme="naver"
      hoverBg="naver"
      activeBg="naver"
      onClick={onClick}
    />
  );
}
