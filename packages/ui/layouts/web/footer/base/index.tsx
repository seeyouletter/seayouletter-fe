import React from 'react';

import { Logo } from '@ui/icon';
import { DefaultVStack } from '@ui/stack';
import { DefaultText } from '@ui/text';

import {
  StyledDefaultLink,
  StyledExternalLink,
  StyledFooterContainer,
  StyledFooterInner,
  StyledLinks,
} from './styles';

const checkIsDefaultLink = (href: string) => {
  return href.startsWith('/');
};

export const BaseFooter = ({
  footerLinks,
}: {
  footerLinks: { name: string; links: { href: string; label: string }[] }[];
}) => {
  return (
    <StyledFooterContainer className="layout__footer">
      <StyledFooterInner>
        <div>
          <Logo />
        </div>

        <StyledLinks as="ul" justify="space-between">
          {footerLinks.map((category) => (
            <DefaultVStack key={category.name} spacing={4}>
              <DefaultText bold textAlign="center">
                {category.name}
              </DefaultText>

              <DefaultVStack alignItems="center" spacing={2}>
                {category.links.map((link) =>
                  checkIsDefaultLink(link.href) ? (
                    <StyledDefaultLink
                      key={link.label + link.href}
                      href={link.href}
                      color="text"
                      noUnderline={false}
                    >
                      {link.label}
                    </StyledDefaultLink>
                  ) : (
                    <StyledExternalLink
                      key={link.label + link.href}
                      href={link.href}
                      color="text"
                      noUnderline={false}
                    >
                      {link.label}
                    </StyledExternalLink>
                  )
                )}
              </DefaultVStack>
            </DefaultVStack>
          ))}
        </StyledLinks>
      </StyledFooterInner>
    </StyledFooterContainer>
  );
};
