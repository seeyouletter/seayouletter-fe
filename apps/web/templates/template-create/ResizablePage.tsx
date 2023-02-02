import React, { useRef } from 'react';

import styled from '@emotion/styled';

interface PagePropsInterface {
  width: string;
  height: string;
}

const StyledResizablePage = styled.section<PagePropsInterface>`
  position: absolute;

  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background-color: ${(props) => props.theme.color.white};
`;

export function ResizablePage({ width, height }: PagePropsInterface) {
  const pageRef = useRef(null);

  return (
    <StyledResizablePage ref={pageRef} className="page" width={width} height={height}>
      ResizablePage
    </StyledResizablePage>
  );
}
