import React from 'react';

import { useTheme } from '@emotion/react';

import { DefaultBox } from '@ui/Box';
import { MyTemplateCard } from '@ui/card';
import { DefaultHStack } from '@ui/stack';

export function MyTemplateList() {
  const theme = useTheme();
  return (
    <DefaultBox height="360px" border={theme.border.default} overflowY="scroll" width="60vw">
      <DefaultHStack paddingRight="24px" display="flex" flexWrap="wrap">
        <DefaultBox paddingTop="24px" paddingBottom="24px" paddingLeft="24px">
          <MyTemplateCard
            title="템플릿1"
            imageAlt="템플릿1"
            imageSrc="/naver-login.svg"
            createAt="2022.01.08"
            lastUpdateAt="10분 전"
          />
        </DefaultBox>
        <DefaultBox paddingTop="24px" paddingBottom="24px" paddingLeft="24px">
          <MyTemplateCard
            title="템플릿1"
            imageAlt="템플릿1"
            imageSrc="/naver-login.svg"
            createAt="2022.01.08"
            lastUpdateAt="10분 전"
          />
        </DefaultBox>
        <DefaultBox paddingTop="24px" paddingBottom="24px" paddingLeft="24px">
          <MyTemplateCard
            title="템플릿1"
            imageAlt="템플릿1"
            imageSrc="/naver-login.svg"
            createAt="2022.01.08"
            lastUpdateAt="10분 전"
          />
        </DefaultBox>
        <DefaultBox paddingTop="24px" paddingBottom="24px" paddingLeft="24px">
          <MyTemplateCard
            title="템플릿1"
            imageAlt="템플릿1"
            imageSrc="/naver-login.svg"
            createAt="2022.01.08"
            lastUpdateAt="10분 전"
          />
        </DefaultBox>
        <DefaultBox paddingTop="24px" paddingBottom="24px" paddingLeft="24px">
          <MyTemplateCard
            title="템플릿1"
            imageAlt="템플릿1"
            imageSrc="/naver-login.svg"
            createAt="2022.01.08"
            lastUpdateAt="10분 전"
          />
        </DefaultBox>
        <DefaultBox paddingTop="24px" paddingBottom="24px" paddingLeft="24px">
          <MyTemplateCard
            title="템플릿1"
            imageAlt="템플릿1"
            imageSrc="/naver-login.svg"
            createAt="2022.01.08"
            lastUpdateAt="10분 전"
          />
        </DefaultBox>
      </DefaultHStack>
    </DefaultBox>
  );
}
