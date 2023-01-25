import { assembledBlockGroups } from '@atoms/blockGroupsAtom';

import React, { PropsWithChildren } from 'react';

import { useAtomValue } from 'jotai';

import { useTheme } from '@emotion/react';

import {
  BlockGroupMemberList,
  BlockInterface,
  DefaultBox,
  DefaultButton,
  DefaultHStack,
  DefaultInput,
  DefaultText,
  DefaultVStack,
  FullSizeMain,
  GroupInterface,
  LeftSidebar,
  LogoImageLink,
  RightSidebar,
  StyledPageContainer,
  TemplateCreateHeader,
  TextMenuButton,
} from 'ui';

import { useBlockGroups } from '@hooks/useBlockGroups';

import { BlockGroupModifier } from './template-create/BlockGroupModifier';

const blockGroups: (GroupInterface | BlockInterface)[] = [
  {
    type: 'group',
    parent: null,
    id: 'component1',
    title: '그룹 1',
    order: 0,
    toggled: false,
    blocks: [
      {
        type: 'block',
        parent: 'component1',
        id: 'block1',
        title: '블록1',
        order: 0,
      },
      {
        type: 'block',
        parent: 'component1',
        id: 'block2',
        title: '블록2',
        order: 1,
      },
      {
        type: 'block',
        parent: 'component1',
        id: 'block3',
        title: '블록3',
        order: 2,
      },

      {
        type: 'group',
        parent: 'component1',
        id: 'subcomponent1',
        title: '서브그룹 1',
        order: 0,
        toggled: false,
        blocks: [
          {
            type: 'block',
            parent: 'subcomponent1',
            id: 'subblock1',
            title: '서브블록1',
            order: 0,
          },
          {
            type: 'block',
            parent: 'subcomponent1',
            id: 'subblock2',
            title: '서브블록2',
            order: 1,
          },
          {
            type: 'block',
            parent: 'subcomponent1',
            id: 'subblock3',
            title: '서브블록3',
            order: 2,
          },
          {
            type: 'group',
            parent: 'subcomponent1',
            id: 'subsubcomponent1',
            title: '서브서브그룹 1',
            order: 0,
            toggled: false,
            blocks: [
              {
                type: 'block',
                parent: 'subsubcomponent1',
                id: 'subsubblock1',
                title: '서브서브블록1',
                order: 0,
              },
              {
                type: 'block',
                parent: 'subsubcomponent1',
                id: 'subsubblock2',
                title: '서브서브블록2',
                order: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'group',
    parent: null,
    id: 'component2',
    title: '그룹 2',
    order: 0,
    toggled: false,
    blocks: [
      {
        type: 'block',
        parent: 'component2',
        id: 'block4',
        title: '블록4',
        order: 0,
      },
      {
        type: 'block',
        parent: 'component2',
        id: 'block5',
        title: '블록5',
        order: 1,
      },
    ],
  },

  {
    type: 'block',
    parent: null,
    id: 'rootblock',
    title: '루트블록',
    order: 0,
  },
];

export default function TemplateCreateLayout({ children }: PropsWithChildren) {
  const theme = useTheme();

  const { activeId, setActiveId, setTitle, setToggle } = useBlockGroups(blockGroups);
  const blockGroupData = useAtomValue(assembledBlockGroups);

  return (
    <StyledPageContainer>
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
            <TextMenuButton borderRadius="0" color={theme.color.white}>
              설정
            </TextMenuButton>

            <TextMenuButton borderRadius="0" color={theme.color.white}>
              블록 생성
            </TextMenuButton>
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
              />
            </DefaultHStack>
          </DefaultHStack>
        </DefaultHStack>
      </DefaultHStack>

      <LeftSidebar actived={true}>
        <DefaultVStack spacing={2} height="calc(100% - 40px)" padding="20px 0">
          <DefaultVStack flex="1">
            <DefaultBox marginLeft="8px" marginBottom="8px">
              <DefaultText bold size={theme.fontSize.sm} color="white">
                생성된 블록
              </DefaultText>
            </DefaultBox>
            {
              <BlockGroupMemberList
                activeId={activeId}
                actived={false}
                parent={null}
                members={blockGroupData ?? []}
                onGroupClick={(e, id) => {
                  setActiveId(id);
                  setToggle(id);
                }}
                onUpdateTitle={(e, { type, id, title }) => setTitle(type, id, title)}
                onBlockClick={(e, id) => setActiveId(id)}
              />
            }
            {/* {blockGroupData &&
              blockGroupData.map((v) => {
                return v.type === 'group' ? (
                  <BlockGroupWrapper
                    key={v.id}
                    type={v.type}
                    blocks={v.blocks}
                    activeId={activeId}
                    onGroupClick={(e, id) => {
                      setActiveId(id);
                      setToggle(id);
                    }}
                    onUpdateTitle={(e, { type, id, title }) => setTitle(type, id, title)}
                    onBlockClick={(e, id) => setActiveId(id)}
                    toggled={v.toggled}
                    title={v.title}
                    id={v.id}
                    parent={v.parent}
                  />
                ) : (
                  <Block
                    key={v.id}
                    type={v.type}
                    activeId={activeId}
                    onUpdateTitle={(e, { type, id, title }) => setTitle(type, id, title)}
                    onBlockClick={(e, id) => setActiveId(id)}
                    title={v.title}
                    id={v.id}
                    parent={v.parent}
                  />
                );
              })} */}
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
        <BlockGroupModifier type="block" subType="image" />
      </RightSidebar>

      <FullSizeMain backgroundColor="black" isHeader={true}>
        {children}
      </FullSizeMain>
    </StyledPageContainer>
  );
}
