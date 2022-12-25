import { globalTheme } from 'styles';

import React, { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

interface StyledTextInterface {
  as: 'p' | 'span' | 'div';
  textAlign: 'left' | 'center' | 'right';
  size: typeof globalTheme['fontSize'];
  color: string;
}

interface TextPropsInterface extends StyledTextInterface, PropsWithChildren {}

const StyledText = styled.span<StyledTextInterface>`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  text-align: ${(props) => props.textAlign};
`;

export default function DefaultText({ as, size, textAlign, children, color }: TextPropsInterface) {
  return (
    <StyledText as={as} size={size} textAlign={textAlign} color={color}>
      {children}
    </StyledText>
  );
}
