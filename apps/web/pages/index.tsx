import BaseLayout from 'layouts/BaseLayout';

import { useRef } from 'react';

import { CheckIcon, DefaultButton, ExclamantationIcon, ToastBoxListTop, XMarkIcon } from 'ui';

import { useToastAtom } from '@hooks/useToast';

export default function Web() {
  const { addToast, toastList, toastContainerKey } = useToastAtom({
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
      <h1>Web</h1>
      <DefaultButton size="md" isLoading={false} onClick={onClick}></DefaultButton>
      <ToastBoxListTop containerKey={toastContainerKey} toastList={toastList}></ToastBoxListTop>
      <XMarkIcon />
      <CheckIcon />
      <ExclamantationIcon />
    </div>
  );
}

Web.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
