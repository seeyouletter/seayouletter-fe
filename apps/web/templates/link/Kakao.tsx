import React from 'react';

import { useRouter } from 'next/navigation';

import { IconButton, KakaoIcon } from 'ui';

export function Kakao() {
  const router = useRouter();

  const onClick = () => {
    router.push('/');
  };

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
