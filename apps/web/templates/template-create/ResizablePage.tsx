import React from 'react';

import { DefaultBox } from '@ui/box';

interface PagePropsInterface {
  width: string;
  height: string;
}
export function ResizablePage({ width, height }: PagePropsInterface) {
  return (
    <DefaultBox width={width} height={height} backgroundColor="white" position="absolute">
      ResizablePage
    </DefaultBox>
  );
}
