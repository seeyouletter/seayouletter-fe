import React from 'react';

import { VisuallyHidden } from '@chakra-ui/react';

export function ScreenReaderText({ children }: React.PropsWithChildren) {
  return <VisuallyHidden>{children}</VisuallyHidden>;
}
