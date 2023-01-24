import React from 'react';

import { Divider } from '@chakra-ui/react';

interface DividerPropsInterface {
  vertical?: boolean;
  horizontal?: boolean;
  size?: string;
  borderColor?: string;
}

export function DefaultDivider({ vertical, horizontal, size, borderColor }: DividerPropsInterface) {
  const orientation = vertical ? 'vertical' : horizontal ? 'horizontal' : 'vertical';
  return <Divider orientation={orientation} size={size} borderColor={borderColor} />;
}
