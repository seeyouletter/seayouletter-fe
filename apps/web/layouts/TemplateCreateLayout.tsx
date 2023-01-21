import React, { PropsWithChildren } from 'react';

import { useTheme } from '@emotion/react';

import {
  DefaultBox,
  DefaultButton,
  DefaultHStack,
  DefaultInput,
  DefaultText,
  DefaultVStack,
  FullSizeMain,
  LeftSidebar,
  LogoImageLink,
  RightSidebar,
  StyledPageContainer,
  TemplateCreateHeader,
  TextMenuButton,
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

        <DefaultHStack spacing={2} position="absolute" right="32px">
          <DefaultButton shape="solid" size="sm" colorScheme="primary">
            임시저장
          </DefaultButton>
          <DefaultButton shape="ghost" size="sm" colorScheme="red" color={theme.color.error}>
            만들기 취소
          </DefaultButton>
        </DefaultHStack>
      </TemplateCreateHeader>

      <DefaultHStack
        backgroundColor="#333"
        position="fixed"
        top={theme.layout.header.height}
        left="0"
        right="0"
        zIndex="10001"
        height="40px"
      >
        <DefaultHStack
          width="100%"
          maxWidth="1024px"
          padding="0 32px"
          margin="0 auto"
          justifyContent="space-between"
        >
          <DefaultHStack spacing={0}>
            <TextMenuButton borderRadius="0" color={theme.color.white}>
              설정
            </TextMenuButton>

            <TextMenuButton borderRadius="0" color={theme.color.white}>
              블록 생성
            </TextMenuButton>
          </DefaultHStack>

          <DefaultHStack spacing={3}>
            <DefaultHStack alignItems="center" spacing={1}>
              <DefaultText color="white" size={theme.fontSize.xs} flexShrink>
                너비
              </DefaultText>
              <DefaultInput
                size="xs"
                placeholder="너비입력"
                width="60px"
                bgColor="#555"
                color={theme.color.white}
                borderColor="transparent"
              />
            </DefaultHStack>

            <DefaultHStack alignItems="center" spacing={1}>
              <DefaultText color="white" size={theme.fontSize.xs} flexShrink>
                높이
              </DefaultText>
              <DefaultInput
                size="xs"
                placeholder="높이입력"
                width="60px"
                bgColor="#555"
                color={theme.color.white}
                borderColor="transparent"
              />
            </DefaultHStack>

            <DefaultHStack alignItems="center" spacing={1}>
              <DefaultText color="white" size={theme.fontSize.xs} flexShrink>
                실제 크기 대비
              </DefaultText>
              <DefaultInput
                size="xs"
                placeholder="비율입력"
                width="60px"
                bgColor="#555"
                color={theme.color.white}
                borderColor="transparent"
              />
            </DefaultHStack>
          </DefaultHStack>
        </DefaultHStack>
      </DefaultHStack>

      <LeftSidebar actived={true} />
      <RightSidebar actived={true} />
      <FullSizeMain backgroundColor="black" isHeader={true}>
        {children}
      </FullSizeMain>
    </StyledPageContainer>
  );
}
