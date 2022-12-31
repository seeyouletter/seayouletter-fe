import React from 'react';

import { getIconSize } from '@ui/utils/getIconSize';

import { Icon } from './Default';
import { IconInterface } from './types';

export function XMarkIcon({ size = '14px' }: IconInterface) {
  const { width, height } = getIconSize({ originalWidth: 13, originalHeight: 14, size });

  return (
    <Icon width={width} height={height} viewBox="0 0 13 14">
      <line
        x1="1"
        y1="-1"
        x2="15"
        y2="-1"
        transform="matrix(0.707107 -0.707107 0.635303 0.772263 1.5 13.4121)"
        stroke="#FF6D6D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="-1"
        x2="15"
        y2="-1"
        transform="matrix(0.707107 0.707107 -0.635303 0.772263 0.5 2.5)"
        stroke="#FF6D6D"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  );
}
