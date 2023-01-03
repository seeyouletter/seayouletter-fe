import BaseLayout from 'layouts/BaseLayout';
import { login } from 'libs/apis/login';
import { emailSchema } from 'libs/utils/schemas';
import { ValidateReturnType, validate } from 'libs/utils/validate';
import { z } from 'zod';

import React, { FormEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DefaultButtonPropsInterface } from '@ui/button/types';
import DefaultVStack from '@ui/stack/VStack';
import DefaultText from '@ui/text/Default';
import {
  DefaultHStack,
  DefaultLink,
  FormInput,
  FullWidthButton,
  LinkInterface,
  Logo,
  ScreenReaderText,
  StrongText,
  globalTheme,
} from 'ui';

import { LoginForm } from '@templates/form/LoginForm';
import { Kakao, Naver } from '@templates/link';

import { useForm } from '@hooks/useForm';

const idInputCSS = css`
  margin-bottom: 0px;
`;

const loginTextFormContainerCSS = css`
  height: 100vh;
`;

const linkMarginCSS = css`
  margin-bottom: 20px;
`;

const errorMessageTextCSS = css`
  margin: 10px 0;
`;

const StyledPage = styled.section`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  align-self: center;
  height: 100%;
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

const StyledLoginHeader = styled.h5`
  padding-top: 4px;
`;

interface LoginFormButtonPropsInterface extends React.PropsWithChildren {
  disabled: DefaultButtonPropsInterface['disabled'];
  onSubmit: DefaultButtonPropsInterface['onClick'];
}

export const LoginFormButton = ({
  disabled,
  onSubmit,
  children,
}: LoginFormButtonPropsInterface) => {
  return (
    <FullWidthButton data-testid="login-button" disabled={disabled} onClick={onSubmit}>
      {children}
    </FullWidthButton>
  );
};

const initialState = {
  id: '',
  pw: '',
};

export default function LoginPage() {
  const router = useRouter();
  const { formState, updateFormState } = useForm<typeof initialState>({
    initialState,
  });

  const onInputChange = (type: keyof typeof formState, value: typeof formState[typeof type]) => {
    updateFormState(type, value);
  };

  const onClickKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_WEB_REDIRECT_URI}/kakao-login`,
    });
  };

  const [errors, setErrors] = useState<{
    [idx in keyof typeof initialState | 'submit']: ValidateReturnType;
  }>({
    id: { success: true, error: null },
    pw: { success: true, error: null },
    submit: { success: true, error: null },
  });

  const onSubmit = async () => {
    try {
      await login();
      router.push('/');
    } catch (e) {
      setErrors((state) => ({
        ...state,
        submit: { success: false, error: 'failed login' },
      }));
    }
  };

  const isDisabled = !formState.id || !formState.pw || !errors.id.success || !errors.pw.success;

  useEffect(() => {
    if (formState.id) {
      setErrors((state) => ({
        ...state,
        id: validate({
          value: formState.id,
          schema: emailSchema,
        }),
        pw: validate({
          value: formState.pw,
          schema: z.string().min(1),
        }),
      }));
    }

    setErrors((state) => ({
      ...state,
      submit: { success: true, error: null },
    }));
  }, [formState]);

  return (
    <StyledPage data-testid="page">
      <DefaultVStack css={loginTextFormContainerCSS} justifyContent="center">
        <DefaultHStack alignItems="center" spacing={2} marginBottom={6}>
          <Logo size={'32px'} />
          <StyledLoginHeader>로그인</StyledLoginHeader>
        </DefaultHStack>

        <ScreenReaderText>로그인 페이지입니다. 아이디와 비밀번호를 입력해주세요!</ScreenReaderText>
        <LoginForm>
          <FormInput
            css={idInputCSS}
            data-testid="id-input"
            aria-label="이메일 아이디 입력"
            size="md"
            placeholder="이메일 ID"
            isInvalid={!errors.id.success}
            errorMessage={errors.id.error ?? ''}
            onInput={(e: FormEvent) => onInputChange('id', (e.target as HTMLInputElement).value)}
          />
          <FormInput
            data-testid="password-input"
            aria-label="비밀번호 입력"
            size="md"
            placeholder="비밀번호"
            isInvalid={!errors.pw.success}
            onInput={(e: FormEvent) => onInputChange('pw', (e.target as HTMLInputElement).value)}
          />

          <FindAccountLink href="find-account">이메일/비밀번호 찾기</FindAccountLink>

          <LoginFormButton data-testid="login-button" disabled={isDisabled} onSubmit={onSubmit}>
            이메일로 로그인하기
          </LoginFormButton>

          <DefaultText
            css={errorMessageTextCSS}
            as="div"
            size={globalTheme.fontSize.sm}
            color={globalTheme.color.error}
            ariaLabel="error-message"
            textAlign="center"
            visible={!!errors.submit.error}
          >
            {errors.submit.error}
          </DefaultText>

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
      </DefaultVStack>
    </StyledPage>
  );
}

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout isHeader={false}>{page}</BaseLayout>;
};
