import React, { PropsWithChildren } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { globalTheme } from '@ui/styles';

interface StyledTextInterface {
  as?: 'p' | 'span' | 'div';
  textAlign?: 'left' | 'center' | 'right';
  size?: string;
  color?: string;
  visible?: boolean;
}

interface TextPropsInterface extends StyledTextInterface, PropsWithChildren {
  ariaLabel?: string;
}

const TextSpacer = styled.div<{ size: StyledTextInterface['size'] }>`
  height: ${(props) => props.size};
`;

const StyledText = styled.span<StyledTextInterface>`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  text-align: ${(props) => props.textAlign};
  ${(props) =>
    !props.visible &&
    css`
      display: none;
    `}
`;

export function DefaultText({
  as = 'span',
  visible,
  size = globalTheme.fontSize.md,
  textAlign = 'left',
  children,
  color = globalTheme.color.text,
  ariaLabel,
  ...props
}: TextPropsInterface) {
  return !!visible ? (
    <StyledText
      as={as}
      visible={visible}
      size={size}
      textAlign={textAlign}
      color={color}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </StyledText>
  ) : (
    <TextSpacer size={size} {...props}></TextSpacer>
  );
}
