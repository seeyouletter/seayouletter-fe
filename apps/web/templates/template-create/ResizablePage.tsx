import React, { PropsWithChildren, useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import { useResizablePageAtom } from '@hooks/useResizablePageAtom';

interface PagePropsInterface extends PropsWithChildren {
  width: string;
  height: string;
}

const StyledResizablePage = styled.section<PagePropsInterface>`
  position: absolute;

  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background-color: ${(props) => props.theme.color.white};
`;

export function ResizablePage({ width, height, children }: PagePropsInterface) {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const { setPageTop, setPageLeft } = useResizablePageAtom();

  useEffect(() => {
    if (pageRef.current !== null) {
      const { top, left } = pageRef.current.getBoundingClientRect();

      setPageTop({ top: top.toString() });
      setPageLeft({ left: left.toString() });
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [pageRef, width, height]);

  return (
    <StyledResizablePage ref={pageRef} className="page" width={width} height={height}>
      {children}
    </StyledResizablePage>
  );
}
