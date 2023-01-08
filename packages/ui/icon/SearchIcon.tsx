import { getIconSize } from '@ui/utils/getIconSize';

import { Icon } from './Default';
import { IconInterface } from './types';

export function SearchIcon({ size = '28px' }: IconInterface) {
  const { width, height } = getIconSize({ originalWidth: 28, originalHeight: 28, size });

  return (
    <Icon width={width} height={height} viewBox="0 0 28 28">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.583 22.8274C17.9801 22.8274 23.166 17.7173 23.166 11.4137C23.166 5.11009 17.9801 0 11.583 0C5.18588 0 0 5.11009 0 11.4137C0 17.7173 5.18588 22.8274 11.583 22.8274ZM11.5822 20.5432C16.6999 20.5432 20.8486 16.4551 20.8486 11.4122C20.8486 6.36932 16.6999 2.28125 11.5822 2.28125C6.46451 2.28125 2.31581 6.36932 2.31581 11.4122C2.31581 16.4551 6.46451 20.5432 11.5822 20.5432Z"
        fill="white"
      />
      <rect
        width="12.0017"
        height="3.99849"
        rx="1.99924"
        transform="matrix(0.724611 0.689158 -0.699744 0.714394 19.3027 16.873)"
        fill="white"
      />
    </Icon>
  );
}
