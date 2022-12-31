import BaseLayout from 'layouts/BaseLayout';

import { CheckIcon, DefaultButton, ExclamantationIcon, ToastBoxListTop, XMarkIcon } from 'ui';

import { useToastAtom } from '@hooks/useToast';

export default function Web() {
  const { addToast } = useToastAtom(2000);
  const { toastList } = useToastAtom();
  const onClick = () => {
    addToast({
      type: 'success',
      title: '안녕하세요.',
      description: '내용입니다.',
    });
  };

  return (
    <div>
      <h1>Web</h1>
      <DefaultButton size="md" isLoading={false} onClick={onClick}></DefaultButton>
      <ToastBoxListTop toastList={toastList}></ToastBoxListTop>
      <XMarkIcon />
      <CheckIcon />
      <ExclamantationIcon />
    </div>
  );
}

Web.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
