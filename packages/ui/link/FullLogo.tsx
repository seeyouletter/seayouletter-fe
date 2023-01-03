import React from 'react';

import { Logo } from '@ui/icon/Logo';
import { TextLogo } from '@ui/icon/TextLogo';

import { DefaultLink } from './Default';
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
