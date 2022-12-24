import BaseLayout from 'layouts/BaseLayout';

import React, { FormEvent } from 'react';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import {
  DefaultHStack,
  DefaultLink,
  FormInput,
  FullWidthButton,
  LinkInterface,
  ScreenReaderText,
  StrongText,
} from 'ui';

import { LoginForm } from '@templates/form/LoginForm';
import { Kakao, Naver } from '@templates/link';

import { useForm } from '@hooks/useForm';

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
  const router = useRouter();

  const { formState, updateFormState, errors, onSubmit, isFormValid } = useForm<string | boolean>({
    initialState: {
      id: {
        value: '',
        validator: () => true,
      },
      pw: {
        value: '',
        validator: () => true,
      },
    },
  });

  const onLogin = () => {
    if (isFormValid) {
      onSubmit(async () => {
        await new Promise((resolve) => {
          resolve(true);
        });
      });
    }
  };

  const isDisabled = !formState.id.value || !formState.pw.value;

  const onInputChange = (type: 'id' | 'pw', value: string) => {
    updateFormState(type, value);
  };

  const onClickKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_WEB_REDIRECT_URI}/kakao-login`,
    });
  };

  return (
    <StyledPage data-testid="page">
      <ScreenReaderText>로그인 페이지입니다. 아이디와 비밀번호를 입력해주세요!</ScreenReaderText>
      <LoginForm>
        <FormInput
          css={idInputCSS}
          data-testid="id-input"
          aria-label="이메일 아이디 입력"
          size="md"
          placeholder="이메일 ID"
          isInvalid={!!errors?.id?.isError}
          onInput={(e: FormEvent) => onInputChange('id', (e.target as HTMLInputElement).value)}
        />
        <FormInput
          data-testid="password-input"
          aria-label="비밀번호 입력"
          size="md"
          placeholder="비밀번호"
          isInvalid={!!errors?.pw?.isError}
          onInput={(e: FormEvent) => onInputChange('pw', (e.target as HTMLInputElement).value)}
        />
        <FindAccountLink href="find-account">이메일/비밀번호 찾기</FindAccountLink>
        <FullWidthButton data-testid="login-button" disabled={isDisabled} onClick={onLogin}>
          이메일로 로그인하기
        </FullWidthButton>

        <DefaultHStack css={linkMarginCSS} justify="center">
          <div>씨유레터가 처음이신가요?</div>
          <SignUpLink
            aria-label="회원가입 링크"
            href="/find-account"
            activeColor="primary.500"
            color="text"
            bold
          >
            <StrongText color="primary">회원가입</StrongText>
          </SignUpLink>
        </DefaultHStack>

        <DefaultHStack spacing={4} justify="center">
          <Kakao onClick={onClickKakao} />
          <Naver onClick={() => router.push('/')} />
        </DefaultHStack>
      </LoginForm>
    </StyledPage>
  );
}

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
