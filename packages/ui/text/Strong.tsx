import styled from '@emotion/styled';

import { globalTheme } from '@ui/styles';

import { StrongTextPropsInterface, StyledStrongInterface } from './types';

const StyledStrong = styled.strong<StyledStrongInterface>`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
`;

export const StrongText = ({
  size = globalTheme.fontSize.md,
  color = 'black',
  children,
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
    <StyledStrong {...props} size={size} color={colors[color] ?? color}>
      {children}
    </StyledStrong>
  );
};
