import BaseLayout from 'layouts/BaseLayout';

import React from 'react';

import { useTheme } from '@emotion/react';

import { IconButton } from '@ui/button';
import { SearchIcon } from '@ui/icon';
import { DefaultInput } from '@ui/input';
import { DefaultSelect } from '@ui/select';
import { DefaultHStack, DefaultVStack } from '@ui/stack';
import { TabGroup } from '@ui/tabs';
import { DefaultText } from '@ui/text';

import { TemplateCardList } from '@templates/card-list';

export default function FindPage() {
  const theme = useTheme();

  return (
    <DefaultVStack paddingBottom={16}>
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

      <DefaultVStack paddingLeft={8} paddingRight={8}>
        <TabGroup
          tabs={[
            {
              id: '제목',
              label: '제목',
              onClick: () => {
                return;
              },
            },
            {
              id: '태그',
              label: '태그',
              onClick: () => {
                return;
              },
            },
            {
              id: '테마',
              label: '테마',
              onClick: () => {
                return;
              },
            },
          ]}
          tabWidth="120px"
          tabHeight="48px"
        />
        <DefaultHStack justifyContent="flex-end" paddingTop={4} paddingBottom={4}>
          <DefaultSelect
            selectType="unstyled"
            options={[
              { label: '옵션1', value: '옵션1' },
              { label: '옵션2', value: '옵션2' },
              { label: '옵션3', value: '옵션3' },
            ]}
            onChange={() => {
              return;
            }}
          ></DefaultSelect>
        </DefaultHStack>

        <DefaultHStack spacing={4} paddingBottom={10}>
          <DefaultSelect
            options={[
              { label: '옵션1', value: '옵션1' },
              { label: '옵션2', value: '옵션2' },
              { label: '옵션3', value: '옵션3' },
            ]}
            onChange={() => {
              return;
            }}
          />
          <DefaultSelect
            options={[
              { label: '옵션1', value: '옵션1' },
              { label: '옵션2', value: '옵션2' },
              { label: '옵션3', value: '옵션3' },
            ]}
            onChange={() => {
              return;
            }}
          />
          <DefaultSelect
            options={[
              { label: '옵션1', value: '옵션1' },
              { label: '옵션2', value: '옵션2' },
              { label: '옵션3', value: '옵션3' },
            ]}
            onChange={() => {
              return;
            }}
          />
          <DefaultSelect
            options={[
              { label: '옵션1', value: '옵션1' },
              { label: '옵션2', value: '옵션2' },
              { label: '옵션3', value: '옵션3' },
            ]}
            onChange={() => {
              return;
            }}
          />
        </DefaultHStack>
      </DefaultVStack>

      <TemplateCardList />
    </DefaultVStack>
  );
}

FindPage.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout isMainPadding={false}>{page}</BaseLayout>;
};
