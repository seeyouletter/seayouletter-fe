import React, { PropsWithChildren } from 'react';

import { useAtomValue } from 'jotai';

import { v4 as uuidv4 } from 'uuid';

import { useTheme } from '@emotion/react';

import { assembledBlockGroups } from '@atoms/blockGroupsAtom';

import { useBlockGroupsAtom, useCreateBlockGroupsStore } from '@hooks/index';
import { useResizablePageAtom } from '@hooks/index';

import {
  BlockGroupMemberList,
  BlockMembersType,
  DefaultBox,
  DefaultButton,
  DefaultHStack,
  DefaultInput,
  DefaultText,
  DefaultVStack,
  FullSizeMain,
  LeftSidebar,
  LogoImageLink,
  Menu,
  MenuItem,
  MenuList,
  RightSidebar,
  StyledPageContainer,
  TemplateCreateHeader,
  TextMenuButton,
} from 'ui';

import { BlockGroupModifier } from './template-create/BlockGroupModifier';

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
        id: uuidv4(),
        title: '블록1',
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
      },
      {
        type: 'block',
        subType: 'shape',
        parent: 'component1',
        id: uuidv4(),
        title: '블록2',
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
      },
      {
        type: 'block',
        subType: 'shape',
        parent: 'component1',
        id: uuidv4(),
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
            id: uuidv4(),
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
          },
          {
            type: 'block',
            subType: 'shape',
            parent: 'subcomponent1',
            id: uuidv4(),
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
          },
          {
            type: 'block',
            subType: 'shape',
            parent: 'subcomponent1',
            id: uuidv4(),
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
                id: uuidv4(),
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
                    top: '1px',
                    right: 'auto',
                    bottom: 'auto',
                    left: '1px',
                  },
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
                textContent: '안녕하세요',
              },
              {
                type: 'block',
                subType: 'shape',
                parent: 'subsubcomponent1',
                id: uuidv4(),
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
              },
              {
                type: 'block',
                subType: 'image',
                parent: 'subsubcomponent1',
                id: uuidv4(),
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
        id: uuidv4(),
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
      },
      {
        type: 'block',
        subType: 'shape',
        parent: 'component2',
        id: uuidv4(),
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
      },
    ],
  },

  {
    type: 'block',
    subType: 'shape',
    parent: null,
    id: uuidv4(),
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
  },
];

const Header = () => {
  const theme = useTheme();

  return (
    <TemplateCreateHeader>
      <DefaultBox position="absolute">
        <LogoImageLink href="/" />
      </DefaultBox>

      <DefaultVStack flex="1" spacing={1}>
        <DefaultText textAlign="center" bold>
          Undefined
        </DefaultText>
        <DefaultText
          textAlign="center"
          size={theme.fontSize.sm}
          color={theme.color.primary[500]}
          bold
        >
          헤더 작업 중...
        </DefaultText>
      </DefaultVStack>

      <DefaultHStack spacing={2} position="absolute" right="32px">
        <DefaultButton shape="solid" size="sm" colorScheme="primary">
          임시저장
        </DefaultButton>
        <DefaultButton shape="ghost" size="sm" colorScheme="red" color={theme.color.error}>
          만들기 취소
        </DefaultButton>
      </DefaultHStack>
    </TemplateCreateHeader>
  );
};

const Toolbar = () => {
  const theme = useTheme();

  const { pageState, setPageWidth, setPageHeight, setPageScale } = useResizablePageAtom();

  return (
    <DefaultHStack
      backgroundColor="#333"
      position="fixed"
      borderBottom={theme.border.darkGray}
      top={theme.layout.header.height}
      left="0"
      right="0"
      zIndex="10001"
      height="40px"
    >
      <DefaultHStack
        width="100%"
        maxWidth="1024px"
        padding="0 32px"
        margin="0 auto"
        justifyContent="space-between"
      >
        <DefaultHStack spacing={0}>
          {/* <TextMenuButton
            color={theme.color.white}
            borderRadius="0"
            onClick={() => {
              return;
            }}
          >
            설정
          </TextMenuButton> */}

          <Menu>
            <TextMenuButton color={theme.color.white}>블록 생성</TextMenuButton>

            <MenuList minWidth="100px" backgroundColor={theme.color.semiDark}>
              <MenuItem
                backgroundColor={theme.color.semiDark}
                color={theme.color.white}
                fontSize={theme.fontSize.xs}
              >
                <DefaultHStack alignItems="baseline" justifyContent="space-between">
                  <DefaultBox marginRight="8px" width="12px">
                    ⎕
                  </DefaultBox>
                  <DefaultText size={theme.fontSize.xs} color={theme.color.white}>
                    블록
                  </DefaultText>
                </DefaultHStack>
              </MenuItem>

              <MenuItem
                backgroundColor={theme.color.semiDark}
                color={theme.color.white}
                fontSize={theme.fontSize.xs}
              >
                <DefaultHStack alignItems="baseline" justifyContent="space-between">
                  <DefaultBox marginRight="8px" width="12px">
                    가
                  </DefaultBox>
                  <DefaultText size={theme.fontSize.xs} color={theme.color.white}>
                    텍스트
                  </DefaultText>
                </DefaultHStack>
              </MenuItem>
            </MenuList>
          </Menu>
        </DefaultHStack>

        <DefaultHStack spacing={3}>
          <DefaultHStack alignItems="center" spacing={1}>
            <DefaultText color="white" size={theme.fontSize.xs} flexShrink>
              너비
            </DefaultText>
            <DefaultInput
              size="xs"
              placeholder="너비입력"
              width="60px"
              bgColor={theme.color.darkGray}
              color={theme.color.white}
              borderColor="transparent"
              value={pageState.width}
              onChange={(e) => setPageWidth({ width: (e.target as HTMLInputElement).value })}
            />
          </DefaultHStack>

          <DefaultHStack alignItems="center" spacing={1}>
            <DefaultText color="white" size={theme.fontSize.xs} flexShrink>
              높이
            </DefaultText>
            <DefaultInput
              size="xs"
              placeholder="높이입력"
              width="60px"
              bgColor="#555"
              color={theme.color.white}
              borderColor="transparent"
              value={pageState.height}
              onChange={(e) => setPageHeight({ height: (e.target as HTMLInputElement).value })}
            />
          </DefaultHStack>

          <DefaultHStack alignItems="center" spacing={1}>
            <DefaultText color="white" size={theme.fontSize.xs} flexShrink>
              실제 크기 대비
            </DefaultText>
            <DefaultInput
              size="xs"
              placeholder="비율입력"
              width="60px"
              bgColor="#555"
              color={theme.color.white}
              borderColor="transparent"
              value={pageState.scale.toString()}
              onChange={(e) => setPageScale({ scale: (e.target as HTMLInputElement).value })}
            />
          </DefaultHStack>
        </DefaultHStack>
      </DefaultHStack>
    </DefaultHStack>
  );
};

export default function TemplateCreateLayout({ children }: PropsWithChildren) {
  useCreateBlockGroupsStore(blockGroups);
  const { activedBlockGroup, activeId, setActiveId, setTitle, setToggle } = useBlockGroupsAtom();

  const theme = useTheme();

  const blockGroupData = useAtomValue(assembledBlockGroups);

  const { pageState } = useResizablePageAtom();

  return (
    <StyledPageContainer>
      <Header />

      <Toolbar />

      <LeftSidebar actived={true}>
        <DefaultVStack spacing={2} height="calc(100% - 40px)" padding="20px 0">
          <DefaultVStack flex="1">
            <DefaultBox marginLeft="8px" marginBottom="8px">
              <DefaultText bold size={theme.fontSize.sm} color="white">
                생성된 블록
              </DefaultText>
            </DefaultBox>
            <BlockGroupMemberList
              depth={0}
              activeId={activeId}
              actived={false}
              members={blockGroupData ?? []}
              onGroupClick={(e, { type, id }) => {
                setActiveId(type, id);
                setToggle(id);
              }}
              onUpdateTitle={(e, { type, id, title }) => setTitle(type, id, title)}
              onBlockClick={(e, { type, id }) => setActiveId(type, id)}
            />
          </DefaultVStack>

          <DefaultVStack spacing={1} paddingLeft="16px" paddingRight="16px">
            <DefaultText size={theme.fontSize.xs} color="white" textAlign="center">
              블록을 간편하게 만들고 싶나요?
            </DefaultText>
            <DefaultButton>빠른 템플릿 찾기</DefaultButton>
          </DefaultVStack>
        </DefaultVStack>
      </LeftSidebar>

      <RightSidebar actived={true} padding="24px 16px">
        {activedBlockGroup ? <BlockGroupModifier blockGroup={activedBlockGroup} /> : <div></div>}
      </RightSidebar>

      <FullSizeMain
        width={pageState.width}
        height={pageState.height}
        backgroundColor="black"
        isHeader={true}
      >
        {children}
      </FullSizeMain>
    </StyledPageContainer>
  );
}
