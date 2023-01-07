import React from 'react';

import { getIconSize } from '@ui/utils/getIconSize';

import { Icon } from './Default';
import { IconInterface } from './types';

export default function HeartFillIcon({ size = '16px' }: IconInterface) {
  const { width, height } = getIconSize({
    originalWidth: 18,
    originalHeight: 16,
    size: size,
  });

  return (
    <Icon width={width} height={height} viewBox="0 0 18 16">
      <path
        d="M14.2022 0.272149C11.3258 -0.537107 9.41291 1.08972 8.81598 2.00429C8.21906 1.11742 6.35887 -0.683976 3.13825 0.272149C0.561755 1.03705 -0.0268411 3.61172 0.000922863 4.80344C0.0897676 9.92504 5.91465 14.4018 8.81598 16C18.0743 10.1018 17.7421 5.72299 17.7421 4.80344C17.7421 3.63006 17.0785 1.08141 14.2022 0.272149Z"
        fill="#FF5555"
      />
    </Icon>
  );
}
