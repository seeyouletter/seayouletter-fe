import React from 'react';

import Image from 'next/image';

import styled from '@emotion/styled';

import { ImageInterface } from '@ui/types/image';

import { CarouselCardItem, CarouselCardList, CarouselContainer, CarouselInner } from './styles';

interface CarouselInnerInterface extends ImageInterface {
  id: string;
}
interface CarouselPropsInterface {
  inners: CarouselInnerInterface[];
}

const StyledImage = styled(Image)`
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
  filter: brightness(0.5);
  object-fit: cover;
  object-position: right;
`;

export default function Carousel({ inners }: CarouselPropsInterface) {
  return (
    <CarouselContainer>
      <CarouselInner>
        <CarouselCardList>
          {inners.map((inner) => (
            <CarouselCardItem>
              <StyledImage
                key={inner.id}
                src={inner.imageSrc}
                alt={inner.imageAlt}
                width={0}
                height={0}
                unoptimized
              />
            </CarouselCardItem>
          ))}
        </CarouselCardList>
      </CarouselInner>
    </CarouselContainer>
  );
}
