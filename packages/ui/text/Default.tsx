import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { globalTheme } from '@ui/styles';

import { DefaultTextPropsInterface, StyledDefaultTextInterface } from './types';

const TextSpacer = styled.div<{ size: StyledDefaultTextInterface['size'] }>`
  height: ${(props) => props.size};
`;

const StyledText = styled.span<StyledDefaultTextInterface>`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  text-align: ${(props) => props.textAlign};

  ${(props) =>
    !props.visible &&
    css`
      display: none;
    `}

  ${({ bold }) =>
    bold &&
    css`
      font-weight: 700;
    `}

  ${({ flexShrink }) =>
    flexShrink &&
    css`
      flex-shrink: 0;
    `}
`;

export function DefaultText({
  as = 'span',
  visible = true,
  size = globalTheme.fontSize.md,
  textAlign = 'inherit',
  children,
  color = globalTheme.color.text,
  ariaLabel,
  bold,
  flexShrink = false,
  ...props
}: DefaultTextPropsInterface) {
  return !!visible ? (
    <StyledText
      as={as}
      visible={visible}
      size={size}
      textAlign={textAlign}
      color={color}
      aria-label={ariaLabel}
      bold={bold}
      flexShrink={flexShrink}
      {...props}
    >
      {children}
    </StyledText>
  ) : (
    <TextSpacer size={size} {...props}></TextSpacer>
  );
}
