import BaseLayout from 'layouts/BaseLayout';

import { CheckIcon, DefaultButton, ExclamantationIcon, ToastBox, XMarkIcon } from 'ui';

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <DefaultButton size="md" isLoading={false}></DefaultButton>
      <ToastBox type="success" title="안녕하세요!" description="내용입니다." />
      <XMarkIcon />
      <CheckIcon />
      <ExclamantationIcon />
    </div>
  );
}

Web.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
