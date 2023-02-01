import { css } from '@emotion/react';
import styled from '@emotion/styled';

import BaseLayout from '@layouts/BaseLayout';

import { LoginForm } from '@templates/index';

import { DefaultVStack, IconHeaderText, Logo, ScreenReaderText } from 'ui';

const loginTextFormContainerCSS = css`
  height: 100vh;
`;

const StyledPage = styled.section`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  align-self: center;
  height: 100%;
`;

export default function LoginPage() {
  return (
    <StyledPage data-testid="page">
      <DefaultVStack css={loginTextFormContainerCSS} justifyContent="center">
        <IconHeaderText
          level="h5"
          Icon={<Logo size={'32px'} />}
          alignItems="center"
          spacing={2}
          marginBottom={6}
          textPaddingTop="4px"
        >
          로그인
        </IconHeaderText>

        <ScreenReaderText>로그인 페이지입니다. 아이디와 비밀번호를 입력해주세요!</ScreenReaderText>

        <LoginForm />
      </DefaultVStack>
    </StyledPage>
  );
}

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout isHeader={false}>{page}</BaseLayout>;
};
