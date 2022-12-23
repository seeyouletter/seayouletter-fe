import BaseLayout from 'layouts/BaseLayout';
import { LoginForm } from 'templates/Form/LoginForm';

import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { LinkInterface } from '@ui/link/types';
import DefaultHStack from '@ui/stack/HStack';
import {
  DefaultLink,
  FormInput,
  FullWidthButton,
  IconButton,
  KakaoIcon,
  NaverIcon,
  StrongText,
} from 'ui';

const idInputCSS = css`
  margin-bottom: 24px;
`;
const linkMarginCSS = css`
  margin: 20px 0;
`;

const StyledPage = styled.section`
  display: flex !important;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FindAccountLink = styled((props: LinkInterface) => <DefaultLink {...props} />)`
  ${linkMarginCSS}
  display: block;
  text-align: right;
`;

const SignUpLink = styled((props: LinkInterface) => <DefaultLink {...props} />)`
  &.link {
    display: inline-block;
    margin-left: 4px;
  }
`;

export default function LoginPage() {
  const errors = {
    id: false,
    pw: false,
  };

  return (
    <StyledPage data-testid="page">
      <LoginForm>
        <FormInput
          css={idInputCSS}
          data-testid="id-input"
          aria-label="이메일 아이디 입력"
          size="md"
          placeholder="이메일 ID"
          isInvalid={errors.id}
        />
        <FormInput
          data-testid="password-input"
          aria-label="비밀번호 입력"
          size="md"
          placeholder="비밀번호"
          isInvalid={errors.pw}
        />
        <FindAccountLink href="find-account">이메일/비밀번호 찾기</FindAccountLink>
        <FullWidthButton>이메일로 로그인하기</FullWidthButton>

        <DefaultHStack css={linkMarginCSS} justify="center">
          <div>씨유레터가 처음이신가요?</div>
          <SignUpLink
            aria-label="회원가입 링크"
            href="/find-account"
            activeColor="primary.500"
            color="text"
            // bold
          >
            <StrongText color="primary">회원가입</StrongText>
          </SignUpLink>
        </DefaultHStack>

        <DefaultHStack spacing={4} justify="center">
          <IconButton
            ariaLabel="카카오 로그인 버튼"
            size="lg"
            icon={<KakaoIcon size="48px" />}
            colorScheme="kakao"
            hoverBg="kakao"
            activeBg="kakao"
          />
          <IconButton
            ariaLabel="네이버 로그인 버튼"
            size="lg"
            icon={<NaverIcon size="48px" />}
            colorScheme="naver"
            hoverBg="naver"
            activeBg="naver"
          />
        </DefaultHStack>
      </LoginForm>
    </StyledPage>
  );
}

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
