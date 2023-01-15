import { blockGroupsTree } from '@atoms/blockGroupsAtom';

import React, { FocusEvent, MouseEvent } from 'react';

import { useAtomValue } from 'jotai';

import { useTheme } from '@emotion/react';

import { v4 as uuidV4 } from 'uuid';

import BaseLayout from 'layouts/BaseLayout';

import {
  Block,
  BlockGroupWrapper,
  BlockInterface,
  DefaultBanner,
  DefaultButton,
  DefaultCarousel,
  DefaultText,
  DefaultVStack,
  GroupInterface,
  StrongText,
} from 'ui';

import { TemplateCardList } from '@templates/index';

import { useBlockGroups } from '@hooks/useBlockGroups';

const CarouselData = [
  {
    id: uuidV4(),
    imageSrc: '/carousel-example.jpeg',
    imageAlt: '이벤트1',
    title: '테스트해봐요!',
    details: ['안녕하세요! 1번째 슬라이드입니다.', '현재 캐러셀 테스트 중입니다.'],
    button: <DefaultButton>템플릿 만들기 💌</DefaultButton>,
  },
  {
    id: uuidV4(),
    imageSrc: '/carousel-example.jpeg',
    imageAlt: '이벤트2',
    title: '테스트해봐요!',
    details: ['안녕하세요! 2번째 슬라이드입니다.', '현재 캐러셀 테스트 중입니다.'],
    button: <DefaultButton>템플릿 만들기 💌</DefaultButton>,
  },
  {
    id: uuidV4(),
    imageSrc: '/carousel-example.jpeg',
    imageAlt: '이벤트3',
    title: '테스트해봐요!',
    details: ['안녕하세요! 3번째 슬라이드입니다.', '현재 캐러셀 테스트 중입니다.'],
    button: <DefaultButton>템플릿 만들기 💌</DefaultButton>,
  },
];

// const blockGroupsDataTree = [
//   {
//     parent: null,
//     id: '1',
//     type: 'group',
//     title: '안녕하세용...',
//     blocks: [
//       {
//         parent: '1',
//         id: '컴포넌트1',
//         type: 'block',
//         title: '컴포넌트 1',
//       },
//       {
//         parent: '1',
//         id: '컴포넌트2',
//         type: 'block',
//         title: '컴포넌트 2',
//       },
//       {
//         parent: '1',
//         id: '컴포넌트3',
//         type: 'block',
//         title: '컴포넌트 3',
//       },
//     ],
//   },
// ];

/*
 * 20페이지만 되어도 1페이지당 1000개의 컴포넌트가 있다고 주어질 시
 * 시그마 20 * 1000 = 200000000
 *
 * 1. 하지만 컴포넌트를 하나의 객체로 관리하고, 1
 * 2. 그 객체에 따라 블록을 추가하고 1
 * 3. 블록에 해당하는 컴포넌트를 일일이 달아주고 1
 * 4. 맨 위에 해당하는 루트를 렌더링하면 2
 * 20000 => 20000 => 20000 = 60000
 *
 * 1번 순회
 * - groupStore 생성
 * - blockStore 생성
 *
 * 2번 순회
 * - groupStore blocks 추가
 * - group blocks에 block 추가
 */

const blockGroupsData: (BlockInterface | GroupInterface)[] = [
  {
    parent: null,
    id: '1',
    order: 0,
    toggled: true,
    type: 'group',
    title: '안녕하세용...',
    blocks: [],
  },
  {
    parent: '1',
    order: 0,
    id: '컴포넌트1',
    type: 'block',
    title: '컴포넌트 1',
  },
  {
    parent: '1',
    order: 1,
    id: '컴포넌트2',
    type: 'block',
    title: '컴포넌트 2',
  },
  {
    parent: '1',
    order: 2,
    id: '컴포넌트3',
    type: 'block',
    title: '컴포넌트 3',
  },
];

export default function Web() {
  const theme = useTheme();

  const { activeId, setActiveId, setTitle, setToggle } = useBlockGroups(blockGroupsData);

  const tree = useAtomValue(blockGroupsTree);

  const onBlockGroupWrapperClick = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    setToggle(id);
    setActiveId(id);
  };

  const onBlockClick = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    setActiveId(id);
  };

  const onUpdateTitle = (
    e: FocusEvent,
    { type, id, title }: { type: 'block' | 'group'; id: string; title: string }
  ) => {
    e.stopPropagation();
    setTitle(type, id, title);
  };

  return (
    <div>
      <DefaultVStack marginBottom={8}>
        <DefaultCarousel inners={CarouselData} />
      </DefaultVStack>

      <div style={{ backgroundColor: 'black', color: 'white' }}>
        {JSON.stringify(activeId)}
        {tree.map((blockGroup) =>
          blockGroup.type === 'group' ? (
            <BlockGroupWrapper
              parent={blockGroup.parent}
              key={blockGroup.id}
              type={blockGroup.type as 'group'}
              id={blockGroup.id}
              title={blockGroup.title}
              blocks={blockGroup.blocks}
              activeId={activeId}
              onGroupClick={onBlockGroupWrapperClick}
              onBlockClick={onBlockClick}
              onUpdateTitle={onUpdateTitle}
              toggled={blockGroup.toggled}
            />
          ) : (
            <Block
              key={blockGroup.id}
              parent={blockGroup.parent}
              type="block"
              id={blockGroup.id}
              title={blockGroup.title}
              activeId={activeId}
              onBlockClick={onBlockClick}
              onUpdateTitle={onUpdateTitle}
            ></Block>
          )
        )}
      </div>

      <TemplateCardList
        title="이런 템플릿 어떠세요?"
        description={
          <DefaultText size={theme.fontSize.lg}>
            예랑예신님들께 핫한 템플릿을 모아봤어요. 🔥
          </DefaultText>
        }
      />
      <TemplateCardList
        title="다양한 템플릿을 만나보세요."
        description={
          <DefaultText size={theme.fontSize.lg}>
            누구든 <StrongText color="primary">5분</StrongText>이면 쉽게 만들 수 있어요 😉
          </DefaultText>
        }
      />

      <DefaultBanner
        type="default"
        linkHref="/login"
        imageSrc="/naver-login.svg"
        imageAlt="배너 테스트"
        title="청첩장 고민은 그만! 씨유레터에서 작별해요."
        description="See you later, at seeyouletter 👋🏻"
      />
    </div>
  );
}

Web.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout isMainPadding={false}>{page}</BaseLayout>;
};
