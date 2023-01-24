/**
 * NOTE:
 * pnpm에서 모노레포에 관한 심볼릭 링크 오류 관련해서 해결할 때까지 이 패턴을 유지한다.
 * 추후 해결될 시  `import type {}`을 통해 모든 문장을 제거한다.
 *
 * @see: https://github.com/microsoft/TypeScript/issues/47663
 */
import type {} from 'node_modules/@types/react';

import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const CarouselContainer = styled.div`
  width: 100%;
  height: 300px;
`;

export const CarouselInner = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
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
  width: 20px;
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

export const StyledCarouselDetail = styled.section`
  position: relative;
  z-index: 1;
  margin-top: 48px;
  margin-left: 32px;
`;

export const StyledCarouselDetailTitle = styled.h3`
  margin-bottom: 24px;
  color: white;
`;
