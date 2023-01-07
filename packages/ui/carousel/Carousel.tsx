import React, { useEffect, useMemo, useState } from 'react';

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
  const reginedInners = useMemo<CarouselInnerInterface[]>(
    () => [inners.at(-1) as CarouselInnerInterface, ...inners, inners[0]],
    [inners]
  );

  const [isLoading, setIsLoading] = useState(false);
  const [nowIndex, setNowIndex] = useState(1);
  const [isTransition, setIsTransition] = useState(false);

  const checkIsOverIndex = () => nowIndex === 0 || nowIndex > inners.length;

  const onPrev = () => {
    if (isLoading) return;

    setIsLoading(() => true);
    setNowIndex((state) => state - 1);
    setIsTransition(() => true);
  };

  const onNext = () => {
    if (isLoading) return;

    setIsLoading(() => true);
    setNowIndex((state) => state + 1);
    setIsTransition(() => true);
  };

  const onTransitionEnd = () => {
    if (checkIsOverIndex()) {
      setIsTransition(() => false);
    }
  };

  /**
   * @description
   * setLoading을 제어합니다.
   */
  useEffect(() => {
    if (nowIndex === 0 || nowIndex > inners.length) {
      setIsLoading(() => true);
    } else {
      setIsLoading(() => false);
    }
  }, [nowIndex, inners.length]);

  /**
   * @description
   * transition이 제어가 되면 index를 조정합니다.
   * 결과적으로 이 변확값은 Loading을 조정하는 useEffect에서 감지가 되어 동기적으로 다시 loading을 해제합니다.
   */
  useEffect(() => {
    if (!isTransition) {
      if (nowIndex > inners.length) {
        setNowIndex(() => 1);
      }
      if (nowIndex === 0) {
        setNowIndex(() => inners.length);
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [isTransition]);

  return (
    <CarouselContainer>
      <CarouselInner>
        <CarouselCardList
          style={{ transition: isTransition ? 'all 0.3s' : 'none' }}
          index={nowIndex}
          isTransition={isLoading}
          onTransitionEnd={onTransitionEnd}
        >
          {reginedInners.map((inner, idx) => (
            <CarouselCardItem>
              <StyledImage
                key={inner.id + idx}
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
