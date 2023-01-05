import BaseLayout from 'layouts/BaseLayout';
import AsyncBoundary from 'libs/suspense/AsyncBoundary';

import { useRef } from 'react';

import { DefaultBanner } from '@ui/banner';
import { CheckIcon, DefaultButton, ExclamantationIcon, ToastBoxListTop, XMarkIcon } from 'ui';

import { TemplateCards } from '@templates/index';

import { useToast } from '@hooks/useToast';

const ErrorComponent = ({ error }: { error: Error }) => {
  return <div>{error.message}</div>;
};

export default function Web() {
  const { addToast, toastList, toastContainerKey } = useToast({
    duration: 2000,
    transitionDuration: 300,
  });

  const ref = useRef(0);
  const onClick = () => {
    addToast({
      type: 'success',
      title: '안녕하세요.' + ++ref.current,
      description: '내용입니다.',
    });
  };

  return (
    <div>
      <DefaultBanner
        type="default"
        linkHref="/login"
        imageSrc="/naver-login.svg"
        imageAlt="배너 테스트"
      ></DefaultBanner>

      <AsyncBoundary
        resetKeys={[]}
        pendingFallback={<div>Loading</div>}
        rejectFallback={({ error }) => <ErrorComponent error={error} />}
      >
        <TemplateCards />
      </AsyncBoundary>

      <h1>Web</h1>
      <DefaultButton size="md" isLoading={false} onClick={onClick}></DefaultButton>
      <ToastBoxListTop containerKey={toastContainerKey} toastList={toastList}></ToastBoxListTop>
      <XMarkIcon />
      <CheckIcon />
      <ExclamantationIcon size={'46px'} />
    </div>
  );
}

Web.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
