import BaseLayout from 'layouts/BaseLayout';

import { useState } from 'react';

import { CheckIcon, DefaultButton, ExclamantationIcon, XMarkIcon } from 'ui';

export default function Web() {
  const [state, setState] = useState(false);
  return (
    <div>
      <h1>Web</h1>
      <DefaultButton
        size="md"
        isLoading={false}
        onClick={() => {
          setState(() => true);
        }}
      >
        {state}
      </DefaultButton>

      <XMarkIcon />
      <CheckIcon />
      <ExclamantationIcon />
    </div>
  );
}

Web.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
