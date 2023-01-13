import React, { MouseEvent, useState } from 'react';

import { useTheme } from '@emotion/react';

import { v4 as uuidV4 } from 'uuid';

import BaseLayout from 'layouts/BaseLayout';

import {
  BlockGroupWrapper,
  BlockMembersType,
  DefaultBanner,
  DefaultButton,
  DefaultCarousel,
  DefaultText,
  DefaultVStack,
  StrongText,
} from 'ui';

import { TemplateCardList } from '@templates/index';

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

const blockGroups = [
  {
    parent: null,
    id: '1',
    type: 'group',
    title: '안녕하세용...',
    blocks: [
      {
        id: '컴포넌트1',
        type: 'block',
        title: '컴포넌트 1',
      },
      {
        id: '컴포넌트2',
        type: 'block',
        title: '컴포넌트 2',
      },
      {
        id: '컴포넌트3',
        type: 'block',
        title: '컴포넌트 3',
      },
    ],
  },
];
export default function Web() {
  const theme = useTheme();
  const [toggleGroups, setToggleGroups] = useState<Record<string, boolean>>({
    '1': false,
  });

  const [activeId, setActiveId] = useState<string | null>(null);

  const onBlockClick = (e: MouseEvent, id: string) => {
    e.stopPropagation();

    setActiveId(() => id);
  };

  const onBlockGroupWrapperClick = (e: MouseEvent, id: string) => {
    e.stopPropagation();

    setToggleGroups((state) => ({ ...state, [id]: !state[id] }));
    setActiveId(() => id);
  };

  return (
    <div>
      <DefaultVStack marginBottom={8}>
        <DefaultCarousel inners={CarouselData} />
      </DefaultVStack>

      <div style={{ backgroundColor: 'black', color: 'white' }}>
        {JSON.stringify(activeId)}
        {blockGroups.map((blockGroup) => (
          <BlockGroupWrapper
            parent={blockGroup.parent}
            key={blockGroup.id}
            type={blockGroup.type as 'group'}
            id={blockGroup.id}
            title={blockGroup.title}
            blocks={blockGroup.blocks as BlockMembersType}
            activeId={activeId}
            onGroupClick={onBlockGroupWrapperClick}
            onBlockClick={onBlockClick}
            toggled={toggleGroups['1']}
          ></BlockGroupWrapper>
        ))}
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
