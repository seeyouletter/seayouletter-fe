import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const CarouselContainer = styled.div`
  width: 100%;
  height: 300px;
`;

export const CarouselInner = styled.div`
  position: relative;
  height: 100%;
`;

export const CarouselCardList = styled.ul<{ isTransition: boolean; index: number }>`
  display: flex;
  width: 100%;
  height: 100%;

  ${({ isTransition }) =>
    isTransition &&
    css`
      transition: all 0.3s;
    `}

  ${({ index }) => {
    return (
      index !== undefined &&
      css`
        transform: translateX(calc(-100% * (${index})));
      `
    );
  }}
`;

export const CarouselCardItem = styled.li`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  background: black;
  transition: all 0.3s;
`;

export const StyledCarouselModerator = styled.section`
  position: absolute;
  right: 24px;
  bottom: 16px;
  z-index: 990;
  display: flex;
`;

export const StyledCarouselCounter = styled.div`
  margin: 0 8px;
`;

export const StyledProgressBarContainer = styled.div`
  width: 240px;
  height: 24px;
`;
export const StyledProgressBarInner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;
`;

export const StyledProgressBarRail = styled.div`
  width: 100%;
  height: 1px;
  background: white;
`;
const progressBarTrackAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

export const StyledProgressBarTrack = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  background: ${(props) => props.theme.color.primary[500]};
  animation: ${progressBarTrackAnimation} 5s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
`;
