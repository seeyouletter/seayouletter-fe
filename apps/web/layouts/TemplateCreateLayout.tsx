import React, { PropsWithChildren } from 'react';

import { useTheme } from '@emotion/react';

import {
  BaseMain,
  DefaultBox,
  DefaultButton,
  DefaultHStack,
  DefaultText,
  DefaultVStack,
  LogoImageLink,
  StyledPageContainer,
  TemplateCreateHeader,
} from 'ui';

export default function TemplateCreateLayout({ children }: PropsWithChildren) {
  const theme = useTheme();

  return (
    <StyledPageContainer>
      <TemplateCreateHeader>
        <DefaultBox position="absolute">
          <LogoImageLink href="/" />
        </DefaultBox>

        <DefaultVStack flex="1" spacing={1}>
          <DefaultText textAlign="center" bold>
            Undefined
          </DefaultText>
          <DefaultText
            textAlign="center"
            size={theme.fontSize.sm}
            color={theme.color.primary[500]}
            bold
          >
            헤더 작업 중...
          </DefaultText>
        </DefaultVStack>

        <DefaultHStack spacing={2} position="absolute" right="0">
          <DefaultButton shape="solid" size="sm" colorScheme="primary">
            임시저장
          </DefaultButton>
          <DefaultButton shape="ghost" size="sm" colorScheme="red" color={theme.color.error}>
            만들기 취소
          </DefaultButton>
        </DefaultHStack>
      </TemplateCreateHeader>
      <BaseMain>{children}</BaseMain>
    </StyledPageContainer>
  );
}
