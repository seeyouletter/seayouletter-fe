import React, { MouseEvent as ReactMouseEvent, useEffect, useMemo, useRef, useState } from 'react';

import { useTheme } from '@emotion/react';

import TemplateCreateLayout from '@layouts/TemplateCreateLayout';

import { BlockPreviewer, ResizablePage } from '@templates/template-create';

import { useResizablePageAtom } from '@hooks/index';
import { useTemplateCreateToolbar } from '@hooks/useTemplateCreateToolbar';

import { DefaultBox } from 'ui';

export default function TemplateCreatePage() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const theme = useTheme();
  const { pageState, setPageWidth, setPageHeight, setPageScale } = useResizablePageAtom();

  const [scrollY, setScrollY] = useState(0);

  const {
    blockCreationState,
    initializeBlockCreation,
    setBlockCreationTop,
    setBlockCreationLeft,
    setBlockCreationWidth,
    setBlockCreationHeight,
  } = useTemplateCreateToolbar();

  const [isCreatingBlock, setIsCreatingBlock] = useState(false);

  const cursorState = useMemo(() => {
    if (blockCreationState.type !== null) {
      return 'crosshair';
    } else {
      return 'auto';
    }
  }, [blockCreationState.type]);

  /**
   * @todo
   * TODO: 기본적으로 설정할 너비와 높이를 커스터마이징한다면 이를 수정하면 된다.
   */
  useEffect(() => {
    setPageWidth({ width: '500px' });
    setPageHeight({ height: '1000px' });
    setPageScale({ scale: '1' });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    window.addEventListener(
      'scroll',
      () => {
        setScrollY(window.scrollY);
      },
      { passive: true }
    );
  });

  const onMouseDown = (e: ReactMouseEvent) => {
    setIsCreatingBlock(() => true);
    const top = e.clientY;
    const left = e.clientX;

    setBlockCreationTop(top);
    setBlockCreationLeft(left);
  };

  const onMouseUp = () => {
    setIsCreatingBlock(() => false);
    initializeBlockCreation();
  };

  useEffect(() => {
    const nowRef = pageRef.current;

    const mouseMoveHandler = (e: MouseEvent) => {
      const { clientY, clientX } = e;

      const width = clientX - blockCreationState.left;
      const height = clientY - blockCreationState.top;

      setBlockCreationWidth(width);
      setBlockCreationHeight(height);
    };

    if (nowRef && isCreatingBlock) {
      nowRef.addEventListener('mousemove', mouseMoveHandler, { passive: true });
    }

    return () => {
      if (nowRef !== null) {
        nowRef.removeEventListener('mousemove', mouseMoveHandler);
      }
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [pageRef, isCreatingBlock]);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        initializeBlockCreation();
      }
    };

    document.body.addEventListener('keydown', keydownHandler);

    return () => {
      document.body.removeEventListener('keydown', keydownHandler);
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <DefaultBox
      ref={pageRef}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      width="100%"
      height={`calc(${pageState.height} + 300px)`}
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={theme.color.dark}
      cursor={cursorState}
    >
      <ResizablePage width={pageState.width} height={pageState.height}>
        {blockCreationState.type && (
          <BlockPreviewer
            width={blockCreationState.width + 'px'}
            height={blockCreationState.height + 'px'}
            top={blockCreationState.top - +pageState.top + scrollY + 'px'}
            left={blockCreationState.left - +pageState.left + 'px'}
          />
        )}
      </ResizablePage>
    </DefaultBox>
  );
}

TemplateCreatePage.getLayout = function getLayout(page: React.ReactElement) {
  return <TemplateCreateLayout>{page}</TemplateCreateLayout>;
};
