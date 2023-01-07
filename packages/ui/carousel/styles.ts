import styled from '@emotion/styled';

export const CarouselContainer = styled.div`
  width: 100%;
  height: 300px;
`;

export const CarouselInner = styled.div`
  position: relative;
  height: 100%;
`;

export const CarouselCardList = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
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
  display: flex;
  align-items: center;
  height: 100%;
`;
export const StyledProgressBarRail = styled.div`
  width: 100%;
  height: 1px;
  background: white;
`;
