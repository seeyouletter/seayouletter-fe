import React from 'react';

import { getIconSize } from '@ui/utils/getIconSize';

import { Icon } from './Default';
import { IconInterface } from './types';

export function CheckIcon({ size = '16px' }: IconInterface) {
  const { width, height } = getIconSize({ originalWidth: 16, originalHeight: 16, size });

  return (
    <Icon width={width} height={height} viewBox="0 0 16 16">
      <line
        x1="1.41421"
        y1="8"
        x2="7"
        y2="13.5858"
        stroke="#009B9F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="6.92567"
        y1="13.5877"
        x2="14.5877"
        y2="5.07433"
        stroke="#009B9F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  );
}
