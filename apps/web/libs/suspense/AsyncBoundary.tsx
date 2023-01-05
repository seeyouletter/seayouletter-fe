import { ComponentProps } from 'react';

import ErrorBoundary from './ErrorBoundary';
import SSRSafeSuspense from './SafeSuspense';

type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;

interface Props extends Omit<ErrorBoundaryProps, 'renderFallback'> {
  pendingFallback: ComponentProps<typeof SSRSafeSuspense>['fallback'];
  rejectFallback: ErrorBoundaryProps['renderFallback'];
}

function AsyncBoundary({
  pendingFallback,
  rejectFallback,
  children,
  ...errorBoundaryProps
}: Props) {
  return (
    <ErrorBoundary renderFallback={rejectFallback} {...errorBoundaryProps}>
      <SSRSafeSuspense fallback={pendingFallback}>{children}</SSRSafeSuspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
