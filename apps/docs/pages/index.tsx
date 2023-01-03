import { useState } from 'react';

import { DefaultButton } from '@ui/index';

export default function Docs() {
  const [state, setState] = useState(false);
  return (
    <div>
      <h1>Docs</h1>
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
