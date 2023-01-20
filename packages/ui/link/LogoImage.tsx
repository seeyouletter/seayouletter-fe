import React from 'react';

import { Logo } from '@ui/icon/Logo';

import { DefaultLink } from './Default';
import { StyledLogoContainer } from './styles';
import { LinkInterface } from './types';

export const LogoImageLink = ({ href }: LinkInterface) => {
  return (
    <DefaultLink href={href}>
      <StyledLogoContainer>
        <Logo />
      </StyledLogoContainer>
    </DefaultLink>
  );
};
