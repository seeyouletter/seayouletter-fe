import React, { MouseEvent as ReactMouseEvent, useEffect, useMemo, useRef, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { useTheme } from '@emotion/react';

import TemplateCreateLayout from '@layouts/TemplateCreateLayout';

import { BlockPreviewer, ResizablePage } from '@templates/template-create';

import { useBlockGroupsAtom, useResizablePageAtom, useTemplateTaskHistories } from '@hooks/index';
import { useTemplateCreateToolbar } from '@hooks/useTemplateCreateToolbar';

import { Blocks, DefaultBox, SizeType } from 'ui';

const getInitialBlockState = ({
  parent,
  width,
  height,
  top,
  left,
}: {
  parent: Blocks['parent'];
  width: SizeType;
  height: SizeType;
  top: SizeType;
  left: SizeType;
}) => {
  return {
    type: 'block',
    subType: 'shape',
    parent,
    id: uuidv4(),
    title: 'Untitled',
    style: {
      size: {
        width,
        height,
      },
      borderRadius: {
        topLeft: '8px',
        topRight: '8px',
        bottomRight: '8px',
        bottomLeft: '8px',
      },
      position: {
        top,
        right: 'auto',
        bottom: 'auto',
        left,
      },
      bg: '#ffffff',
      opacity: '1',
      border: {
        top: {
          width: '1px',
          style: 'solid',
          color: 'black',
          opacity: '1',
        },
        right: {
          width: '1px',
          style: 'solid',
          color: 'black',
          opacity: '1',
        },
        bottom: {
          width: '1px',
          style: 'solid',
          color: 'black',
          opacity: '1',
        },
        left: {
          width: '1px',
          style: 'solid',
          color: 'black',
          opacity: '1',
        },
      },
    },
  };
};

export default function TemplateCreatePage() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const theme = useTheme();
  const { activedBlockGroup } = useBlockGroupsAtom();
  const { pageState, setPageWidth, setPageHeight, setPageScale } = useResizablePageAtom();

  const { tasks } = useTemplateTaskHistories();
  // TODO: 추후 삭제한다.
  // eslint-disable-next-line
  console.log('here: ', tasks);

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

    // TODO: 추후 태스크큐가 생성되면 이를 등록해야 한다.
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const nextBlock = getInitialBlockState({
      parent:
        activedBlockGroup === null
          ? null
          : activedBlockGroup.type === 'block'
          ? activedBlockGroup.parent
          : activedBlockGroup.id,
      width: blockCreationState.width + 'px',
      height: blockCreationState.height + 'px',
      top: blockCreationState.top - +pageState.top + scrollY + 'px',
      left: blockCreationState.left - +pageState.left + 'px',
    });

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
