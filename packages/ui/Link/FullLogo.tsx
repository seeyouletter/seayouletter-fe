import React from 'react';

import { DefaultLink } from '.';
import { Logo } from '../icon/Logo';
import { TextLogo } from '../icon/TextLogo';
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
