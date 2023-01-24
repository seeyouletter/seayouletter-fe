import { PropsWithChildren } from 'react';

export type DynamicHeaderTextType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface StyledDefaultTextInterface {
  as?: 'p' | 'span' | 'div';
  textAlign?: 'left' | 'center' | 'right' | 'inherit';
  size?: string;
  color?: string;
  visible?: boolean;
  bold?: boolean;
  flexShrink?: boolean;
}

export type StrongColorType = 'primary' | 'sub' | 'black' | 'white' | 'inherit';

export interface DefaultTextPropsInterface extends StyledDefaultTextInterface, PropsWithChildren {
  ariaLabel?: string;
}

export interface StrongTextPropsInterface
  extends Partial<StyledStrongInterface>,
    PropsWithChildren {
  color?: StrongColorType;
  size?: string;
}

export interface StyledStrongInterface {
  color: string;
  size: string;
  flexShrink: boolean;
}
