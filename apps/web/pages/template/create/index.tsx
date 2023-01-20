import React from 'react';

import TemplateCreateLayout from 'layouts/TemplateCreateLayout';

export default function TemplateCreatePage() {
  return <div>TemplateCreatePage</div>;
}

TemplateCreatePage.getLayout = function getLayout(page: React.ReactElement) {
  return <TemplateCreateLayout>{page}</TemplateCreateLayout>;
};
