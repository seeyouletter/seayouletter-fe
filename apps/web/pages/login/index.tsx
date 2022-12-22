import BaseLayout from 'layouts/BaseLayout';

import React from 'react';

import { FormInput } from '@packages/ui/input';

export default function LoginPage() {
  const errors = {
    id: false,
    pw: false,
  };

  return (
    <section data-testid="page">
      <FormInput
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
    </section>
  );
}

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
