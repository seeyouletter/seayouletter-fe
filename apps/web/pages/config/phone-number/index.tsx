import ConfigLayout from 'layouts/ConfigLayout';

import React, { FormEvent, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DefaultButtonPropsInterface } from '@ui/button/types';
import { DefaultButton, DefaultHStack, FormInput, FullWidthButton, IconHeaderText, Logo } from 'ui';

import { ConfigForm } from '@templates/index';

const StyledConfigPage = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - ${(props) => props.theme.layout.header.height});
  background-color: ${(props) => props.theme.color.layout.page};
`;

const numberInputCSS = css`
  width: 100%;
`;

const RequestPhoneAuthButton = styled((props: DefaultButtonPropsInterface) => (
  <DefaultButton {...props}></DefaultButton>
))`
  flex-shrink: 0;
  background-color: pink !important;
`;

const marginBottomCSS = css`
  margin-bottom: 24px;
`;

export default function ConfigPhoneNumberPage() {
  const [isRequested, setIsRequeseted] = useState(false);

  const [inputValues, setInputValues] = useState({
    phoneNumber: '',
    auth: '',
  });

  const onRequestPhoneAuthButtonClick = () => {
    setIsRequeseted(() => true);
  };

  const onInput = (type: keyof typeof inputValues) => (e: FormEvent) => {
    setInputValues((state) => ({
      ...state,
      [type]: (e.target as HTMLInputElement).value,
    }));
  };

  return (
    <StyledConfigPage>
      <IconHeaderText
        level="h5"
        Icon={<Logo size={'32px'} />}
        alignItems="center"
        spacing={2}
        marginBottom={6}
        textPaddingTop="4px"
      >
        반가워요! 👋🏻
      </IconHeaderText>
      <ConfigForm>
        <h6>안전한 계정관리를 위해</h6>
        <h6 css={marginBottomCSS}>휴대전화 번호를 설정해주세요 🙇🏻‍♂️</h6>
        <DefaultHStack spacing={2}>
          <FormInput
            css={numberInputCSS}
            size="md"
            placeholder="-를 제외한 번호만 입력"
            onInput={onInput('phoneNumber')}
            isInvalid={!inputValues.phoneNumber.length}
            flexShrink
          />
          <RequestPhoneAuthButton onClick={onRequestPhoneAuthButtonClick}>
            인증 요청하기
          </RequestPhoneAuthButton>
        </DefaultHStack>

        {isRequested && (
          <FormInput
            css={numberInputCSS}
            size="md"
            placeholder="문자로 전송된 인증번호 입력"
            onInput={onInput('auth')}
            isInvalid={!inputValues.auth.length}
            flexShrink
            errorMessage="인증번호가 일치하지 않아요."
          />
        )}

        <FullWidthButton disabled={!isRequested || !inputValues.auth.length}>
          인증 완료하기
        </FullWidthButton>
      </ConfigForm>
    </StyledConfigPage>
  );
}

ConfigPhoneNumberPage.getLayout = function (page: React.ReactElement) {
  return <ConfigLayout>{page}</ConfigLayout>;
};
