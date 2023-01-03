import React from 'react';

import { Icon } from './Default';
import { IconInterface } from './types';

export const NaverIcon = ({ size = '48px' }: IconInterface) => {
  return (
    <Icon viewBox="0 0 48 48" width={size} height={size}>
      <path
        d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
        fill="#1EC800"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.7665 16.1763V24.3169L21.0674 16.1763H14.9077V32.3135H21.0471V24.172L26.7471 32.3135H32.9077V16.1763H26.7665Z"
        fill="white"
      />
    </Icon>
  );
};
