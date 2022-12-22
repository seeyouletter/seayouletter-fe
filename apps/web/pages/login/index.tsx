import BaseLayout from 'layouts/BaseLayout';

import React from 'react';

export default function LoginPage() {
  return <section data-testid="page">LoginPage</section>;
}

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
