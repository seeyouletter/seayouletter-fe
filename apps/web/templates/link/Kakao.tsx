'use client';

import React from 'react';

import { IconButton, KakaoIcon } from 'ui';

import { OAuthLinkButtonInterface } from './types';

export function Kakao({ onClick }: OAuthLinkButtonInterface) {
  return (
    <IconButton
      role="link"
      ariaLabel="카카오 로그인 링크"
      size="lg"
      icon={<KakaoIcon size="48px" />}
      colorScheme="kakao"
      hoverBg="kakao"
      activeBg="kakao"
      onClick={onClick}
    />
  );
}
