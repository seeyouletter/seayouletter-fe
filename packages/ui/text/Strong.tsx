import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import { globalColor } from '@ui/styles';

export type StrongColorType = 'primary' | 'sub' | 'black';

interface StrongTextPropsInterface extends PropsWithChildren {
  color?: StrongColorType & string;
}

const StyledStrong = styled.strong<{ color: StrongColorType | string }>`
  color: ${(props) => props.color};
`;

export const StrongText = ({ color = 'black', children, ...props }: StrongTextPropsInterface) => {
  const colors = {
    primary: globalColor.primary[500],
    sub: globalColor.sub[500],
    black: globalColor.text,
    white: globalColor.white,
  };

  return (
    <StyledStrong {...props} color={colors[color] ?? color}>
      {children}
    </StyledStrong>
  );
};
