import styled from '@emotion/styled';

export const StyledBannerContainer = styled.div<{ height: string }>`
  position: relative;
  width: 100%;
  height: ${({ height }) => height};
`;
