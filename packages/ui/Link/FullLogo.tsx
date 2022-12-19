import React from 'react';

import { Logo } from '../Icon/Logo';
import { TextLogo } from '../Icon/TextLogo';
import { DefaultLink } from '../Link';
import { StyledLogoContainer } from './styles';
import { LinkInterface } from './types';

export const FullLogoLink = ({ href }: LinkInterface) => {
  return (
    <DefaultLink href={href}>
      <StyledLogoContainer>
        <Logo />
      </StyledLogoContainer>
      <TextLogo />
    </DefaultLink>
  );
};
