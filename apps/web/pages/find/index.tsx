import BaseLayout from 'layouts/BaseLayout';

import React from 'react';

import { useTheme } from '@emotion/react';

import { IconButton } from '@ui/button';
import { SearchIcon } from '@ui/icon';
import { DefaultInput } from '@ui/input';
import { DefaultHStack, DefaultVStack } from '@ui/stack';
import { DefaultText } from '@ui/text';

export default function FindPage() {
  const theme = useTheme();

  return (
    <DefaultVStack
      width="100%"
      height="150px"
      alignItems="center"
      justifyContent="center"
      spacing={4}
      position="relative"
      zIndex={10}
      _after={{
        position: 'absolute',
        zIndex: -1,
        content: '""',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        filter: 'brightness(0.5)',
        backgroundImage: '/carousel-example.webp',
      }}
    >
      <DefaultText bold size={theme.fontSize.sm} color="white">
        원하는 키워드를 등록하세요.
      </DefaultText>
      <DefaultHStack spacing={4}>
        <DefaultInput placeholder="입력" size="md" isInvalid={false} borderColor="white" />
        <IconButton
          size="md"
          icon={<SearchIcon size="20px" />}
          role="button"
          ariaLabel="검색 버튼"
        />
      </DefaultHStack>
    </DefaultVStack>
  );
}

FindPage.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout isMainPadding={false}>{page}</BaseLayout>;
};
