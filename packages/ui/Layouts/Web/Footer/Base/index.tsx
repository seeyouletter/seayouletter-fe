import React from 'react';

import { VStack } from '@chakra-ui/react';

import { Logo } from '../../../../Icon';
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
            <VStack key={category.name}>
              <h6>{category.name}</h6>
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
            </VStack>
          ))}
        </StyledLinks>
      </StyledFooterInner>
    </StyledFooterContainer>
  );
};
