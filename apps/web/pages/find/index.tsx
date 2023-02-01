import React from 'react';

import BaseLayout from '@layouts/BaseLayout';

import { TemplateCardList } from '@templates/card-list';
import { FindTemplateSearchForm } from '@templates/form';

import { DefaultHStack, DefaultSelect, DefaultVStack, TabGroup } from 'ui';

const FindTemplateCategorySelects = () => {
  return (
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
  );
};
export default function FindPage() {
  return (
    <DefaultVStack paddingBottom={16}>
      <FindTemplateSearchForm />

      <FindTemplateCategorySelects />

      <TemplateCardList />
    </DefaultVStack>
  );
}

FindPage.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout isMainPadding={false}>{page}</BaseLayout>;
};
