import type {} from 'node_modules/@types/react';

import styled from '@emotion/styled';

export const StyledBannerContainer = styled.div<{ height: string }>`
  position: relative;
  width: 100%;
  height: ${({ height }) => height};
`;
