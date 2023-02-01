import { z } from 'zod';

import React, { FormEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { Kakao, Naver } from '@templates/link';

import { useForm } from '@common-hooks/useForm';

import { ValidateReturnType, emailSchema, validate } from '@utils/index';

import { login } from '@apis/login';

import {
  DefaultButtonPropsInterface,
  DefaultHStack,
  DefaultLink,
  DefaultText,
  Form,
  FormInput,
  FormPropsInterface,
  FullWidthButton,
  LinkInterface,
  StrongText,
  globalTheme,
} from 'ui';

const idInputCSS = css`
  margin-bottom: 0px;
`;
const errorMessageTextCSS = css`
  margin: 10px 0;
`;

const loginFormCSS = (color: string, border: string) => css`
  width: 420px;
  height: 420px;
  padding: 2.5rem;

  background-color: ${color};
  border: ${border};
  border-radius: 20px;
`;

const linkMarginCSS = css`
  margin-bottom: 20px;
`;

const initialState = {
  id: '',
  pw: '',
};

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

export function LoginForm({ ...props }: FormPropsInterface) {
  const theme = useTheme();

  const router = useRouter();
  const { formState, updateFormState } = useForm<typeof initialState>({
    initialState,
  });

  const onInputChange = (type: keyof typeof formState, value: (typeof formState)[typeof type]) => {
    updateFormState(type, value);
  };

  const onClickKakao = () => {
    // TODO: 아직 명세가 확정되지 않았다. 추후 3rd party 인증 API가 추가되면 적용한다.
    /* eslint-disable-next-line */
    console.log('추후 3rd party 인증 API가 추가되면 적용한다.');
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
    <Form css={loginFormCSS(theme.color.white, theme.border.default)} {...props}>
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
    </Form>
  );
}
