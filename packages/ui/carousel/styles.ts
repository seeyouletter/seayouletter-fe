import styled from '@emotion/styled';

export const CarouselContainer = styled.div`
  width: 100%;
  height: 300px;
`;

export const CarouselInner = styled.div`
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
