import React from 'react';

import { useRouter } from 'next/navigation';

import { IconButton, NaverIcon } from 'ui';

export function Naver() {
  const router = useRouter();

  const onClick = () => {
    router.push('/');
  };

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
