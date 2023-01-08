import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import { globalTheme } from '@ui/styles';

export type StrongColorType = 'primary' | 'sub' | 'black' | 'white' | 'inherit';

interface StrongTextPropsInterface extends PropsWithChildren {
  color?: StrongColorType & string;
}

const StyledStrong = styled.strong<{
  color: StrongColorType | string;
}>`
  color: ${(props) => props.color};
`;

export const StrongText = ({ color = 'black', children, ...props }: StrongTextPropsInterface) => {
  const colors = {
    primary: globalTheme.color.primary[500],
    sub: globalTheme.color.sub[500],
    black: globalTheme.color.text,
    white: globalTheme.color.white,
    inherit: 'inherit',
  };

  return (
    <StyledStrong {...props} color={colors[color] ?? color}>
      {children}
    </StyledStrong>
  );
};
