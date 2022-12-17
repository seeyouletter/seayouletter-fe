import React, { PropsWithChildren } from 'react';

import { SystemProps } from '@chakra-ui/react';

import { SizeType } from '../common/types';

export type ButtonType = 'ghost' | 'outline' | 'solid' | 'link' | 'unstyled';

export interface ButtonInterface extends PropsWithChildren {
  colorScheme: string;
  size?: SizeType;
  shape: ButtonType;
  disabled: boolean;
  isLoading: boolean;
  onClick: () => void;
}

export interface DefaultButtonPropsInterface extends ButtonInterface {
  colorScheme: string;
  width?: string;
  height?: string;
  loadingText?: string;
}

export interface IconWithTextButtonPropsInterface extends DefaultButtonPropsInterface {
  iconSpacing: SystemProps['marginRight'];
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  shape: ButtonType;
  colorScheme: string;
}

export interface IconButtonPropsInterface extends ButtonInterface {
  ariaLabel: string;
  icon: React.ReactElement;
  isRound?: boolean;
  size: SizeType;
}
