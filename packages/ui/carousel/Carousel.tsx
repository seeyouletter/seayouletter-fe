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

  const [carouselState, setCarouselState] = useState({
    isLoading: false,
    nowIndex: 1,
    isTransition: true,
  });

  const checkIsOverIndex = () =>
    carouselState.nowIndex === 0 || carouselState.nowIndex > inners.length;

  const onPrev = () => {
    if (carouselState.isLoading) return;

    setCarouselState((state) => ({
      isLoading: true,
      nowIndex: state.nowIndex - 1,
      isTransition: true,
    }));
  };

  const onNext = () => {
    if (carouselState.isLoading) return;

    setCarouselState((state) => ({
      isLoading: true,
      nowIndex: state.nowIndex + 1,
      isTransition: true,
    }));
  };

  const onTransitionEnd = () => {
    if (checkIsOverIndex()) {
      setCarouselState((state) => ({
        ...state,
        isTransition: false,
      }));
    }
  };

  /**
   * @description
   * setLoading을 제어합니다.
   */
  useEffect(() => {
    if (carouselState.nowIndex === 0 || carouselState.nowIndex > inners.length) {
      setCarouselState((state) => ({
        ...state,
        isLoading: true,
      }));
    } else {
      setCarouselState((state) => ({
        ...state,
        isLoading: false,
      }));
    }
  }, [carouselState.nowIndex, inners.length]);

  /**
   * @description
   * transition이 제어가 되면 index를 조정합니다.
   * 결과적으로 이 변확값은 Loading을 조정하는 useEffect에서 감지가 되어 동기적으로 다시 loading을 해제합니다.
   */
  useEffect(() => {
    if (!carouselState.isTransition) {
      if (carouselState.nowIndex > inners.length) {
        setCarouselState((state) => ({
          ...state,
          nowIndex: 1,
        }));
      }
      if (carouselState.nowIndex === 0) {
        setCarouselState((state) => ({
          ...state,
          nowIndex: inners.length,
        }));
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [carouselState.isTransition]);

  return (
    <CarouselContainer>
      <CarouselInner>
        <CarouselCardList
          style={{ transition: carouselState.isTransition ? 'all 0.3s' : 'none' }}
          index={carouselState.nowIndex}
          isTransition={carouselState.isLoading}
          onTransitionEnd={onTransitionEnd}
        >
          {reginedInners.map((inner, idx) => (
            <CarouselCardItem>
              <h1>
                {`${carouselState.isTransition}`}
                {carouselState.nowIndex}
              </h1>
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
          nowIndex={carouselState.nowIndex}
          totalLength={inners.length}
          onPrev={onPrev}
          onNext={onNext}
        />
      </CarouselInner>
    </CarouselContainer>
  );
}
