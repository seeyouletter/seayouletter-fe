import React, { MouseEvent as ReactMouseEvent, useEffect, useMemo, useRef, useState } from 'react';

import { useAtomValue } from 'jotai';

import { v4 as uuidv4 } from 'uuid';

import { useTheme } from '@emotion/react';

import TemplateCreateLayout from '@layouts/TemplateCreateLayout';

import { BlockPreviewer, NodeList, ResizablePage } from '@templates/template-create';

import { assembledBlockGroups } from '@atoms/blockGroupsAtom';

import { useBlockGroupsAtom, useResizablePageAtom, useTemplateTaskHistories } from '@hooks/index';
import { useTemplateCreateToolbar } from '@hooks/useTemplateCreateToolbar';

import { Blocks, DefaultBox, SizeType, globalTheme } from 'ui';

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
}): Blocks => {
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
        topLeft: '0px',
        topRight: '0px',
        bottomRight: '0px',
        bottomLeft: '0px',
      },
      position: {
        top,
        right: 'auto',
        bottom: 'auto',
        left,
      },
      bg: globalTheme.color.primary[500],
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
  const { activedBlockGroup, addBlock } = useBlockGroupsAtom();
  const { pageState, setPageWidth, setPageHeight, setPageScale } = useResizablePageAtom();

  const { addTask } = useTemplateTaskHistories();

  const [scrollY, setScrollY] = useState(0);

  const {
    isCreating,
    disableCreating,
    blockCreationState,
    initializeBlockCreation,
    setBlockCreationTop,
    setBlockCreationLeft,
    setBlockCreationWidth,
    setBlockCreationHeight,
  } = useTemplateCreateToolbar();

  const [isMousePressing, setIsMousePressing] = useState(false);

  const blockGroupsTree = useAtomValue(assembledBlockGroups);

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
  }, []);

  const onMouseDown = (e: ReactMouseEvent) => {
    if (!isCreating) return;

    setIsMousePressing(() => true);
    const top = e.clientY;
    const left = e.clientX;

    setBlockCreationTop(top);
    setBlockCreationLeft(left);
  };

  const onMouseUp = () => {
    if (!isCreating || !isMousePressing) return;

    setIsMousePressing(() => false);

    // TODO: 추후 태스크큐가 생성되면 이를 등록해야 한다.
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const nextBlock: Blocks = getInitialBlockState({
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

    addBlock(nextBlock);

    addTask({
      taskType: 'create',
      before: null,
      after: nextBlock,
    });

    disableCreating();
    initializeBlockCreation();
  };

  useEffect(() => {
    const nowRef = pageRef.current;

    const mouseMoveHandler = (e: MouseEvent) => {
      const { clientY, clientX } = e;

      const defaultWidth = clientX - blockCreationState.left;
      const defaultHeight = clientY - blockCreationState.top;

      let width = defaultWidth;
      let height = defaultHeight;

      if (defaultWidth < 0) {
        width = -1 * defaultWidth;
        setBlockCreationLeft(clientX);
      }

      if (defaultHeight < 0) {
        height = -1 * defaultHeight;
        setBlockCreationTop(clientY);
      }

      setBlockCreationWidth(width);
      setBlockCreationHeight(height);
    };

    if (nowRef && isMousePressing) {
      nowRef.addEventListener('mousemove', mouseMoveHandler, { passive: true });
    }

    return () => {
      if (nowRef !== null) {
        nowRef.removeEventListener('mousemove', mouseMoveHandler);
      }
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [pageRef, isMousePressing]);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        disableCreating();
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
        {blockGroupsTree && <NodeList listItems={blockGroupsTree}></NodeList>}
      </ResizablePage>
    </DefaultBox>
  );
}

TemplateCreatePage.getLayout = function getLayout(page: React.ReactElement) {
  return <TemplateCreateLayout>{page}</TemplateCreateLayout>;
};
