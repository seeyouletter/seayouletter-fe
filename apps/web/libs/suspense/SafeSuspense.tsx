import { ComponentProps, Suspense } from 'react';

import { useMounted } from '@hooks/index';

export default function SafeSuspense(props: ComponentProps<typeof Suspense>) {
  const isMounted = useMounted();

  if (isMounted) {
    return <Suspense {...props} />;
  }

  return <>{props.fallback}</>;
}
