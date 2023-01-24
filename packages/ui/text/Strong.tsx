import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { globalTheme } from '@ui/styles';

import { StrongTextPropsInterface, StyledStrongInterface } from './types';

const StyledStrong = styled.strong<StyledStrongInterface>`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  ${({ flexShrink }) =>
    flexShrink &&
    css`
      flex-shrink: 0;
    `}
`;

export const StrongText = ({
  size = globalTheme.fontSize.md,
  color = 'black',
  children,
  flexShrink = false,
  ...props
}: StrongTextPropsInterface) => {
  const colors = {
    primary: globalTheme.color.primary[500],
    sub: globalTheme.color.sub[500],
    black: globalTheme.color.text,
    white: globalTheme.color.white,
    inherit: 'inherit',
  };

  return (
    <StyledStrong {...props} size={size} color={colors[color] ?? color} flexShrink={flexShrink}>
      {children}
    </StyledStrong>
  );
};
