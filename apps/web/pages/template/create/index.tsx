import React, { useEffect } from 'react';

import TemplateCreateLayout from '@layouts/TemplateCreateLayout';

import { ResizablePage } from '@templates/template-create';

import { useResizablePageAtom } from '@hooks/index';

export default function TemplateCreatePage() {
  const { pageState, setPageWidth, setPageHeight, setPageScale } = useResizablePageAtom();

  useEffect(() => {
    setPageWidth({ width: '500px' });
    setPageHeight({ height: '1000px' });
    setPageScale({ scale: '1' });
  }, []);

  return <ResizablePage width={pageState.width} height={pageState.height} />;
}

TemplateCreatePage.getLayout = function getLayout(page: React.ReactElement) {
  return <TemplateCreateLayout>{page}</TemplateCreateLayout>;
};
