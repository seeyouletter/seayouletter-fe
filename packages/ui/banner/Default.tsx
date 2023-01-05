import React, { PropsWithChildren, ReactNode } from 'react';

import Image from 'next/image';

import styled from '@emotion/styled';

import { DefaultLink, ExternalLink } from '@ui/link';
import { DefaultVStack } from '@ui/stack';
import { HeaderText } from '@ui/text';

import { StyledBannerContainer } from './styles';

interface StyledBannerPropsInterface {
  height?: string;
}

type BannerType = 'default' | 'external';

interface BannerPropsInterface extends StyledBannerPropsInterface, PropsWithChildren {
  type: BannerType;
  linkHref: string;
  imageSrc: string;
  imageAlt?: string;
}

const LinkFactory = ({
  type,
  href,
  children,
}: {
  type: BannerType;
  href: string;
  children: ReactNode;
}) => {
  if (type === 'external') {
    return <ExternalLink href={href}>{children}</ExternalLink>;
  } else {
    return <DefaultLink href={href}>{children}</DefaultLink>;
  }
};

/**
 * NOTE: next13.1에서 이를 export할 때 명명할 수 없다는 에러가 난다.
 */
const StyledBannerImage = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledCopyContainer = styled(DefaultVStack)`
  position: absolute;
  z-index: 11;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
`;

export function DefaultBanner({
  type,
  linkHref,
  height = '160px',
  imageSrc,
  imageAlt = '배너',
}: BannerPropsInterface) {
  return (
    <LinkFactory type={type} href={linkHref}>
      <StyledBannerContainer height={height}>
        <StyledCopyContainer justify="center" spacing={4}>
          <HeaderText as="h4" textAlign="center" color="white">
            청첩장 고민은 그만! 씨유레터에서 작별해요.
          </HeaderText>
          <HeaderText as="h6" textAlign="center" color="white">
            See you later, at seeyouletter 👋🏻
          </HeaderText>
        </StyledCopyContainer>
        <StyledBannerImage src={imageSrc} alt={imageAlt} fill />
      </StyledBannerContainer>
    </LinkFactory>
  );
}
