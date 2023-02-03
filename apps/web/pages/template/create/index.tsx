import React, { useEffect } from 'react';

import { useTheme } from '@emotion/react';

import TemplateCreateLayout from '@layouts/TemplateCreateLayout';

import { ResizablePage } from '@templates/template-create';

import { useResizablePageAtom } from '@hooks/index';

import { DefaultBox } from 'ui';

export default function TemplateCreatePage() {
  const theme = useTheme();
  const { pageState, setPageWidth, setPageHeight, setPageScale } = useResizablePageAtom();

  /**
   * @todo
   * TODO: 기본적으로 설정할 너비와 높이를 커스터마이징한다면 이를 수정하면 된다.
   */
  useEffect(() => {
    setPageWidth({ width: '500px' });
    setPageHeight({ height: '1000px' });
    setPageScale({ scale: '1' });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <DefaultBox
      width="100%"
      height={`calc(${pageState.height} + 300px)`}
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={theme.color.dark}
    >
      <ResizablePage width={pageState.width} height={pageState.height} />
    </DefaultBox>
  );
}

TemplateCreatePage.getLayout = function getLayout(page: React.ReactElement) {
  return <TemplateCreateLayout>{page}</TemplateCreateLayout>;
};
