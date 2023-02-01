import React from 'react';

import { useTheme } from '@emotion/react';

import BaseLayout from '@layouts/BaseLayout';

import { TemplateCardList } from '@templates/index';

import { DefaultButton, DefaultHStack, DefaultVStack, HeaderText, MyTemplateCard } from 'ui';

const templates = [
  {
    id: '1',
    title: '템플릿1',
    imageAlt: '템플릿1',
    imageSrc: '/naver-login.svg',
    createAt: '2022.01.08',
    lastUpdateAt: '10분 전',
  },
  {
    id: '2',
    title: '템플릿1',
    imageAlt: '템플릿1',
    imageSrc: '/naver-login.svg',
    createAt: '2022.01.08',
    lastUpdateAt: '10분 전',
  },
  {
    id: '3',
    title: '템플릿1',
    imageAlt: '템플릿1',
    imageSrc: '/naver-login.svg',
    createAt: '2022.01.08',
    lastUpdateAt: '10분 전',
  },
  {
    id: '4',
    title: '템플릿1',
    imageAlt: '템플릿1',
    imageSrc: '/naver-login.svg',
    createAt: '2022.01.08',
    lastUpdateAt: '10분 전',
  },
];

export default function My() {
  const theme = useTheme();

  return (
    <section>
      <DefaultVStack
        width="100%"
        height="360px"
        background={theme.color.dark}
        spacing={8}
        justifyContent="center"
        paddingLeft={8}
        paddingRight={8}
      >
        <DefaultHStack justifyContent="space-between">
          <HeaderText as="h4" color="white">
            작업 중인 템플릿 목록
          </HeaderText>
          <DefaultButton>전체 보기</DefaultButton>
        </DefaultHStack>

        <DefaultHStack justifyContent="space-between">
          {templates.map((template) => (
            <MyTemplateCard
              key={template.id}
              id={template.id}
              title={template.title}
              imageAlt={template.imageAlt}
              imageSrc={template.imageSrc}
              createAt={template.createAt}
              lastUpdateAt={template.lastUpdateAt}
            />
          ))}
        </DefaultHStack>
      </DefaultVStack>

      <DefaultVStack marginTop={16}>
        <TemplateCardList title="찜한 템플릿" button={<DefaultButton>전체 보기</DefaultButton>} />
      </DefaultVStack>
    </section>
  );
}

My.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout isMainPadding={false}>{page}</BaseLayout>;
};
