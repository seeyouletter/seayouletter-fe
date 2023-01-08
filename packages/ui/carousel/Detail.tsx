import React, { ReactNode } from 'react';

import { DefaultVStack } from '@ui/stack';
import { DefaultText } from '@ui/text';

import { StyledCarouselDetail, StyledCarouselDetailTitle } from './styles';

export interface CarouselDetailPropsInterface {
  title: string;
  details: string[];
  button?: ReactNode;
}

export default function CarouselDetail({ title, details, button }: CarouselDetailPropsInterface) {
  return (
    <StyledCarouselDetail>
      <StyledCarouselDetailTitle>{title}</StyledCarouselDetailTitle>

      <DefaultVStack marginBottom={6} spacing={2}>
        {details.map((description, idx) => (
          <DefaultText key={idx} color="white">
            {description}
          </DefaultText>
        ))}
      </DefaultVStack>

      {button && button}
    </StyledCarouselDetail>
  );
}
