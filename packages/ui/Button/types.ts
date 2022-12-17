import React, { PropsWithChildren } from 'react';

import { SystemProps } from '@chakra-ui/react';

import { SizeType } from '../common/types';

export type ButtonType = 'ghost' | 'outline' | 'solid' | 'link' | 'unstyled';

export interface DefaultButtonPropsInterface extends PropsWithChildren {
  colorScheme: string;

  size?: SizeType;
  width?: string;
  height?: string;

  disabled: boolean;
  isLoading: boolean;
  loadingText?: string;
}

export interface IconWithTextButtonPropsInterface extends DefaultButtonPropsInterface {
  iconSpacing: SystemProps['marginRight'];
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  shape: ButtonType;
}

export interface IconButtonPropsInterface {
  ariaLabel: string;
  colorScheme: string;
  icon: React.ReactElement;
  disabled: boolean;
  isLoading: boolean;
  isRound?: boolean;
  size: SizeType;
  shape: ButtonType;
}
