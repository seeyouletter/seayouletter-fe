import React from 'react';

import { Divider } from '@chakra-ui/react';

interface DividerPropsInterface {
  vertical?: boolean;
  horizontal?: boolean;
  height?: string;
  borderColor?: string;
}

export function DefaultDivider({
  vertical,
  horizontal,
  height,
  borderColor,
}: DividerPropsInterface) {
  const orientation = vertical ? 'vertical' : horizontal ? 'horizontal' : 'vertical';
  return <Divider orientation={orientation} height={height} borderColor={borderColor} />;
}
