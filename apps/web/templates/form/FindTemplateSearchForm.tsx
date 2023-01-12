import React from 'react';

import { useTheme } from '@emotion/react';

import {
  DefaultHStack,
  DefaultInput,
  DefaultText,
  DefaultVStack,
  IconButton,
  SearchIcon,
} from 'ui';

export function FindTemplateSearchForm() {
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
      marginBottom={16}
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
