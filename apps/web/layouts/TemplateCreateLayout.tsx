import React, { PropsWithChildren } from 'react';

import { useAtomValue } from 'jotai';

import { useTheme } from '@emotion/react';

import { assembledBlockGroups } from '@atoms/blockGroupsAtom';

import { useBlockGroupsAtom } from '@hooks/index';
import { useResizablePageAtom, useTemplateCreateToolbar } from '@hooks/index';

import {
  BlockGroupMemberList,
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

  const { initializeActiveId } = useBlockGroupsAtom();
  const { pageState, setPageWidth, setPageHeight, setPageScale } = useResizablePageAtom();

  const { enableCreating, setShapeBlockCreationActive, setTextBlockCreationActive } =
    useTemplateCreateToolbar();

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
          <Menu>
            <TextMenuButton color={theme.color.white}>블록 생성</TextMenuButton>

            <MenuList minWidth="100px" backgroundColor={theme.color.semiDark}>
              <MenuItem
                backgroundColor={theme.color.semiDark}
                color={theme.color.white}
                fontSize={theme.fontSize.xs}
                onClick={() => {
                  initializeActiveId();
                  enableCreating();
                  setShapeBlockCreationActive();
                }}
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
                onClick={() => {
                  enableCreating();
                  setTextBlockCreationActive();
                }}
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
  const { activedBlockGroup, activeId, hoverId, setActiveId, setHoverId, setTitle, setToggle } =
    useBlockGroupsAtom();

  const theme = useTheme();

  const blockGroupData = useAtomValue(assembledBlockGroups);

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
              hoverId={hoverId}
              hovered={false}
              members={blockGroupData ?? []}
              onGroupClick={(e, { type, id, depth, order }) => {
                setActiveId(type, id, depth, order);
                setToggle(id);
              }}
              onUpdateTitle={(e, { type, id, title }) => setTitle(type, id, title)}
              onBlockClick={(e, { type, id, depth, order }) => setActiveId(type, id, depth, order)}
              onBlockHover={(e, { id, depth, order }) => setHoverId({ id, depth, order })}
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

      <FullSizeMain backgroundColor="#000000" isHeader={true}>
        {children}
      </FullSizeMain>
    </StyledPageContainer>
  );
}
