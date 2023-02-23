import React, { MouseEvent as ReactMouseEvent, useEffect, useMemo, useRef, useState } from 'react';

import { useAtomValue } from 'jotai';

import { v4 as uuidv4 } from 'uuid';

import { useTheme } from '@emotion/react';

import TemplateCreateLayout from '@layouts/TemplateCreateLayout';

import { BlockPreviewer, NodeList, ResizablePage } from '@templates/template-create';

import { assembledBlockGroups } from '@atoms/blockGroupsAtom';

import {
  useBlockGroupsAtom,
  useCreateBlockGroupsStore,
  useResizablePageAtom,
  useTemplateCreateToolbar,
  useTemplateTaskHistories,
  useTemplateTasksInit,
} from '@hooks/index';

import { BlockMembersType, Blocks, DefaultBox, SizeType, globalTheme } from 'ui';

const blockGroups: BlockMembersType = [
  {
    type: 'group',
    subType: 'default',
    parent: null,
    id: 'component1',
    title: '그룹 1',
    toggled: false,
    blocks: [
      {
        type: 'block',
        subType: 'shape',
        parent: 'component1',
        id: '블록1',
        title: '블록1',
        style: {
          size: {
            width: '300px',
            height: '120px',
          },
          borderRadius: {
            topLeft: '8px',
            topRight: '8px',
            bottomRight: '8px',
            bottomLeft: '8px',
          },
          position: {
            top: '123px',
            right: 'auto',
            bottom: 'auto',
            left: '205px',
          },
          bg: '#634654',
          opacity: '1',
          border: {
            top: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
            right: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '300px',
            },
            bottom: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
            left: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
          },
        },
      },
      {
        type: 'block',
        subType: 'shape',
        parent: 'component1',
        id: '블록2',
        title: '블록2',
        style: {
          size: {
            width: '50px',
            height: '120px',
          },
          borderRadius: {
            topLeft: '8px',
            topRight: '8px',
            bottomRight: '8px',
            bottomLeft: '8px',
          },
          position: {
            top: '400px',
            right: 'auto',
            bottom: 'auto',
            left: '60px',
          },
          bg: '#1fe693',
          opacity: '1',
          border: {
            top: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
            right: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
            bottom: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
            left: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
          },
        },
      },
      {
        type: 'block',
        subType: 'shape',
        parent: 'component1',
        id: '블록3',
        title: '블록3',
        style: {
          size: {
            width: '100px',
            height: '120px',
          },
          borderRadius: {
            topLeft: '8px',
            topRight: '8px',
            bottomRight: '8px',
            bottomLeft: '8px',
          },
          position: {
            top: '1px',
            right: 'auto',
            bottom: 'auto',
            left: '1px',
          },
          bg: '#ffffff',
          opacity: '1',
          border: {
            top: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
            right: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
            bottom: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
            left: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
          },
        },
      },

      {
        type: 'group',
        subType: 'default',
        parent: 'component1',
        id: 'subcomponent1',
        title: '서브그룹 1',
        toggled: false,
        blocks: [
          {
            type: 'block',
            subType: 'shape',
            parent: 'subcomponent1',
            id: '서브블록1',
            title: '서브블록1',
            style: {
              size: {
                width: '100px',
                height: '120px',
              },
              borderRadius: {
                topLeft: '8px',
                topRight: '8px',
                bottomRight: '8px',
                bottomLeft: '8px',
              },
              position: {
                top: '1px',
                right: 'auto',
                bottom: 'auto',
                left: '1px',
              },
              bg: '#ffffff',
              opacity: '1',
              border: {
                top: {
                  width: '1px',
                  style: 'solid',
                  color: '#000000',
                  opacity: '1',
                },
                right: {
                  width: '1px',
                  style: 'solid',
                  color: '#000000',
                  opacity: '1',
                },
                bottom: {
                  width: '1px',
                  style: 'solid',
                  color: '#000000',
                  opacity: '1',
                },
                left: {
                  width: '1px',
                  style: 'solid',
                  color: '#000000',
                  opacity: '1',
                },
              },
            },
          },
          {
            type: 'block',
            subType: 'shape',
            parent: 'subcomponent1',
            id: '서브블록2',
            title: '서브블록2',
            style: {
              size: {
                width: '100px',
                height: '120px',
              },
              borderRadius: {
                topLeft: '8px',
                topRight: '8px',
                bottomRight: '8px',
                bottomLeft: '8px',
              },
              position: {
                top: '1px',
                right: 'auto',
                bottom: 'auto',
                left: '1px',
              },
              bg: '#ffffff',
              opacity: '1',
              border: {
                top: {
                  width: '1px',
                  style: 'solid',
                  color: '#000000',
                  opacity: '1',
                },
                right: {
                  width: '1px',
                  style: 'solid',
                  color: '#000000',
                  opacity: '1',
                },
                bottom: {
                  width: '1px',
                  style: 'solid',
                  color: '#000000',
                  opacity: '1',
                },
                left: {
                  width: '1px',
                  style: 'solid',
                  color: '#000000',
                  opacity: '1',
                },
              },
            },
          },
          {
            type: 'block',
            subType: 'shape',
            parent: 'subcomponent1',
            id: '서브블록3',
            title: '서브블록3',
            style: {
              size: {
                width: '100px',
                height: '120px',
              },
              borderRadius: {
                topLeft: '8px',
                topRight: '8px',
                bottomRight: '8px',
                bottomLeft: '8px',
              },
              position: {
                top: '1px',
                right: 'auto',
                bottom: 'auto',
                left: '1px',
              },
              bg: '#ffffff',
              opacity: '1',
              border: {
                top: {
                  width: '1px',
                  style: 'solid',
                  color: '#000000',
                  opacity: '1',
                },
                right: {
                  width: '1px',
                  style: 'solid',
                  color: '#000000',
                  opacity: '1',
                },
                bottom: {
                  width: '1px',
                  style: 'solid',
                  color: '#000000',
                  opacity: '1',
                },
                left: {
                  width: '1px',
                  style: 'solid',
                  color: '#000000',
                  opacity: '1',
                },
              },
            },
          },
          {
            type: 'group',
            subType: 'default',
            parent: 'subcomponent1',
            id: 'subsubcomponent1',
            title: '서브서브그룹 1',
            toggled: false,
            blocks: [
              {
                type: 'block',
                subType: 'text',
                parent: 'subsubcomponent1',
                id: '서브서브블록텍스트1',
                title: '서브서브블록텍스트1',
                style: {
                  size: {
                    width: '100px',
                    height: '120px',
                  },
                  borderRadius: {
                    topLeft: '8px',
                    topRight: '8px',
                    bottomRight: '8px',
                    bottomLeft: '8px',
                  },
                  position: {
                    top: '120px',
                    right: 'auto',
                    bottom: 'auto',
                    left: '170px',
                  },
                  opacity: '1',
                  border: {
                    top: {
                      width: '1px',
                      style: 'solid',
                      color: '#000000',
                      opacity: '1',
                    },
                    right: {
                      width: '1px',
                      style: 'solid',
                      color: '#000000',
                      opacity: '1',
                    },
                    bottom: {
                      width: '1px',
                      style: 'solid',
                      color: '#000000',
                      opacity: '1',
                    },
                    left: {
                      width: '1px',
                      style: 'solid',
                      color: '#000000',
                      opacity: '1',
                    },
                  },
                },
                textStyle: {
                  color: '#f5ee32',
                  fontSize: '16px',
                  textStroke: '0px',
                  textStrokeColor: '#f5ee32',
                  letterSpacing: '0px',
                  fontWeight: 'bold',
                  lineHeight: '1',
                  fontFamily: 'Noto Sans KR',
                  fontStyle: '기본',
                },
                textContent:
                  '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
              },
              {
                type: 'block',
                subType: 'shape',
                parent: 'subsubcomponent1',
                id: '서브서브블록1',
                title: '서브서브블록1',
                style: {
                  size: {
                    width: '100px',
                    height: '120px',
                  },
                  borderRadius: {
                    topLeft: '8px',
                    topRight: '8px',
                    bottomRight: '8px',
                    bottomLeft: '8px',
                  },
                  position: {
                    top: '1px',
                    right: 'auto',
                    bottom: 'auto',
                    left: '1px',
                  },
                  bg: '#ffffff',
                  opacity: '1',
                  border: {
                    top: {
                      width: '1px',
                      style: 'solid',
                      color: '#000000',
                      opacity: '1',
                    },
                    right: {
                      width: '1px',
                      style: 'solid',
                      color: '#000000',
                      opacity: '1',
                    },
                    bottom: {
                      width: '1px',
                      style: 'solid',
                      color: '#000000',
                      opacity: '1',
                    },
                    left: {
                      width: '1px',
                      style: 'solid',
                      color: '#000000',
                      opacity: '1',
                    },
                  },
                },
              },
              {
                type: 'block',
                subType: 'image',
                parent: 'subsubcomponent1',
                id: '서브서브블록2',
                title: '서브서브블록2',
                style: {
                  size: {
                    width: '100px',
                    height: '120px',
                  },
                  borderRadius: {
                    topLeft: '8px',
                    topRight: '8px',
                    bottomRight: '8px',
                    bottomLeft: '8px',
                  },
                  position: {
                    top: '1px',
                    right: 'auto',
                    bottom: 'auto',
                    left: '1px',
                  },
                  bg: '#ffffff',
                  opacity: '1',
                  border: {
                    top: {
                      width: '1px',
                      style: 'solid',
                      color: '#000000',
                      opacity: '1',
                    },
                    right: {
                      width: '1px',
                      style: 'solid',
                      color: '#000000',
                      opacity: '1',
                    },
                    bottom: {
                      width: '1px',
                      style: 'solid',
                      color: '#000000',
                      opacity: '1',
                    },
                    left: {
                      width: '1px',
                      style: 'solid',
                      color: '#000000',
                      opacity: '1',
                    },
                  },
                },
                image: {
                  imageUrl: '재영이의 우당탕탕 시유레터.jpg',
                  imageName: '재영이의 우당탕탕 시유레터',
                },
                imageStyle: {
                  opacity: '1',
                  objectFit: 'contains',
                  position: {
                    top: '50%',
                    left: '50%',
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'group',
    subType: 'default',
    parent: null,
    id: 'component2',
    title: '그룹 2',
    toggled: false,
    blocks: [
      {
        type: 'block',
        subType: 'shape',
        parent: 'component2',
        id: '블록4',
        title: '블록4',
        style: {
          size: {
            width: '100px',
            height: '120px',
          },
          borderRadius: {
            topLeft: '8px',
            topRight: '8px',
            bottomRight: '8px',
            bottomLeft: '8px',
          },
          position: {
            top: '1px',
            right: 'auto',
            bottom: 'auto',
            left: '1px',
          },
          bg: '#ffffff',
          opacity: '1',
          border: {
            top: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
            right: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
            bottom: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
            left: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
          },
        },
      },
      {
        type: 'block',
        subType: 'shape',
        parent: 'component2',
        id: '블록5',
        title: '블록5',
        style: {
          size: {
            width: '100px',
            height: '120px',
          },
          borderRadius: {
            topLeft: '8px',
            topRight: '8px',
            bottomRight: '8px',
            bottomLeft: '8px',
          },
          position: {
            top: '1px',
            right: 'auto',
            bottom: 'auto',
            left: '1px',
          },
          bg: '#ffffff',
          opacity: '1',
          border: {
            top: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
            right: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
            bottom: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
            left: {
              width: '1px',
              style: 'solid',
              color: '#000000',
              opacity: '1',
            },
          },
        },
      },
    ],
  },

  {
    type: 'block',
    subType: 'shape',
    parent: null,
    id: '루트블록',
    title: '루트블록',
    style: {
      size: {
        width: '100px',
        height: '120px',
      },
      borderRadius: {
        topLeft: '8px',
        topRight: '8px',
        bottomRight: '8px',
        bottomLeft: '8px',
      },
      position: {
        top: '1px',
        right: 'auto',
        bottom: 'auto',
        left: '1px',
      },
      bg: '#ffffff',
      opacity: '1',
      border: {
        top: {
          width: '1px',
          style: 'solid',
          color: '#000000',
          opacity: '1',
        },
        right: {
          width: '1px',
          style: 'solid',
          color: '#000000',
          opacity: '1',
        },
        bottom: {
          width: '1px',
          style: 'solid',
          color: '#000000',
          opacity: '1',
        },
        left: {
          width: '1px',
          style: 'solid',
          color: '#000000',
          opacity: '1',
        },
      },
    },
  },
];

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

  const { activedBlockGroup, initializeActiveId, addBlock, deleteBlock } = useBlockGroupsAtom();
  const { pageState, setPageWidth, setPageHeight, setPageScale } = useResizablePageAtom();
  const { addTask } = useTemplateTaskHistories();

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

  useCreateBlockGroupsStore(blockGroups);

  const [isMousePressing, setIsMousePressing] = useState(false);

  const blockGroupsTree = useAtomValue(assembledBlockGroups);

  const cursorState = useMemo(() => {
    if (blockCreationState.type !== null) {
      return 'crosshair';
    } else {
      return 'auto';
    }
  }, [blockCreationState.type]);

  useTemplateTasksInit();

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

    //   // TODO: 추후 태스크큐가 생성되면 이를 등록해야 한다.
    //   /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const nextBlock: Blocks = getInitialBlockState({
      parent:
        activedBlockGroup === null
          ? null
          : activedBlockGroup.type === 'block'
          ? activedBlockGroup.parent
          : activedBlockGroup.id,
      width: blockCreationState.width + 'px',
      height: blockCreationState.height + 'px',
      top: blockCreationState.top - +pageState.top + pageState.scrollY + 'px',
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
      if (!isMousePressing) return;

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

    if (nowRef) {
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

  useEffect(() => {
    /**
     * @description
     * TODO: 추후 group 로직을 추가할 때 만들어야 한다.
     */
    const deleteBlockGroupHandler = (e: KeyboardEvent) => {
      if (activedBlockGroup !== null && activedBlockGroup.type === 'block') {
        if (e.key === 'Backspace') {
          addTask({
            taskType: 'delete',
            before: activedBlockGroup,
            after: null,
          });

          deleteBlock(activedBlockGroup);

          initializeActiveId();
        }
      }
    };

    document.body.addEventListener('keydown', deleteBlockGroupHandler);

    return () => {
      document.body.removeEventListener('keydown', deleteBlockGroupHandler);
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [activedBlockGroup]);

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

        {blockGroupsTree && <NodeList depth={0} listItems={blockGroupsTree} />}
      </ResizablePage>
    </DefaultBox>
  );
}

TemplateCreatePage.getLayout = function getLayout(page: React.ReactElement) {
  return <TemplateCreateLayout>{page}</TemplateCreateLayout>;
};
