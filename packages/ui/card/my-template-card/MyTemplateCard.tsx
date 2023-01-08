import React from 'react';

import Image from 'next/image';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { DefaultVStack } from '@ui/stack';
import { DefaultText } from '@ui/text';

import { MyTemplateCardDetailBoxCSS, StyledMyTemplateCardContainer } from './styles';

interface MyTemplateCardPropsInterface {
  imageSrc: string;
  imageAlt: string;
  title: string;
  createAt: string;
  lastUpdateAt: string;
}

const StyledImage = styled(Image)`
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;

  transition: all 0.3s;
  :hover {
    filter: brightness(0.5);
  }
`;

export function MyTemplateCard({
  imageSrc,
  imageAlt,
  title,
  createAt,
  lastUpdateAt,
}: MyTemplateCardPropsInterface) {
  const theme = useTheme();
  return (
    <StyledMyTemplateCardContainer
      padding="0"
      overflow="hidden"
      position="relative"
      transition={'all 0.2s'}
      width="220px"
      height="180px"
      border={theme.border.default}
      borderRadius={theme.borderRadius.soft}
      background="white"
    >
      <StyledImage width={220} height={180} src={imageSrc} alt={imageAlt} unoptimized />

      <DefaultVStack
        css={MyTemplateCardDetailBoxCSS}
        spacing={2}
        justifyContent="center"
        paddingLeft="12px"
      >
        <DefaultText bold color="white">
          {title}
        </DefaultText>

        <DefaultVStack spacing={1}>
          <DefaultText color="white" size="12px">
            {createAt}
          </DefaultText>
          <DefaultText color="white" size="12px">
            {lastUpdateAt}
          </DefaultText>
        </DefaultVStack>
      </DefaultVStack>
    </StyledMyTemplateCardContainer>
  );
}
