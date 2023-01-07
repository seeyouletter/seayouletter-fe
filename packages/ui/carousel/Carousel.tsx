import React, { useState } from 'react';

import Image from 'next/image';

import styled from '@emotion/styled';

import { ImageInterface } from '@ui/types/image';

import { CarouselModerator } from './Moderator';
import { CarouselCardItem, CarouselCardList, CarouselContainer, CarouselInner } from './styles';

interface CarouselInnerInterface extends ImageInterface {
  id: string;
}
interface CarouselPropsInterface {
  inners: CarouselInnerInterface[];
}

const StyledImage = styled(Image)`
  right: 0;
  width: 100%;
  height: 100%;
  filter: brightness(0.5);
  object-fit: cover;
  object-position: right;
`;

export default function Carousel({ inners }: CarouselPropsInterface) {
  const [nowIndex, setNowIndex] = useState(1);
  const onPrev = () => {
    setNowIndex((state) => state - 1);
  };

  const onNext = () => {
    setNowIndex((state) => state + 1);
  };

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
        <CarouselModerator
          nowIndex={nowIndex}
          totalLength={inners.length}
          onPrev={onPrev}
          onNext={onNext}
        />
      </CarouselInner>
    </CarouselContainer>
  );
}
