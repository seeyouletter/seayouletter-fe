import React, { PropsWithChildren } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { globalTheme } from '@ui/styles';

import { DynamicHeaderTextType } from './types';

interface StyledHeaderTextInterface {
  as?: DynamicHeaderTextType;
  textAlign?: 'left' | 'center' | 'right';
  size?: string;
  color?: string;
  visible?: boolean;
}

export interface TextPropsInterface extends StyledHeaderTextInterface, PropsWithChildren {
  ariaLabel?: string;
}

const TextSpacer = styled.div<{ size: StyledHeaderTextInterface['size'] }>`
  height: ${(props) => props.size};
`;

const StyledHeaderText = styled.span<StyledHeaderTextInterface>`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  text-align: ${(props) => props.textAlign};
  ${(props) =>
    !props.visible &&
    css`
      display: none;
    `}
`;

export function HeaderText({
  as = 'h6',
  visible = true,
  textAlign = 'left',
  children,
  color = globalTheme.color.text,
  ariaLabel,
  ...props
}: TextPropsInterface) {
  return !!visible ? (
    <StyledHeaderText
      as={as}
      visible={visible}
      textAlign={textAlign}
      color={color}
      aria-label={ariaLabel}
      size={globalTheme.fontSize[as]}
      {...props}
    >
      {children}
    </StyledHeaderText>
  ) : (
    <TextSpacer size={globalTheme.fontSize[as]} {...props}></TextSpacer>
  );
}
