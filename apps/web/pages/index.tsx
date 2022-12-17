import { useState } from 'react';

import { DefaultButton } from 'ui';

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
    </div>
  );
}
