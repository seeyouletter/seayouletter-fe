import BaseLayout from 'layouts/BaseLayout';

import { useTheme } from '@emotion/react';

import { v4 as uuidV4 } from 'uuid';

import { DefaultBanner } from '@ui/banner';
import Carousel from '@ui/carousel/Carousel';
import {
  DefaultButton,
  DefaultHStack,
  DefaultText,
  DefaultVStack,
  StrongText,
  TemplateCard,
} from 'ui';

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

export default function Web() {
  const theme = useTheme();

  return (
    <div>
      <DefaultVStack marginBottom={8}>
        <Carousel inners={CarouselData} />
      </DefaultVStack>

      <DefaultVStack paddingLeft={8} paddingRight={8} marginBottom={16}>
        <DefaultVStack marginBottom={8} spacing={2}>
          <h4>이런 템플릿 어떠세요?</h4>
          <DefaultText size={theme.fontSize.lg}>
            예랑예신님들께 핫한 템플릿을 모아봤어요. 🔥
          </DefaultText>
        </DefaultVStack>

        <DefaultHStack spacing={6}>
          <TemplateCard
            imageSrc="/naver-login.svg"
            imageAlt="image"
            title="타이틀입니다."
            nickname="불량한 너구리12"
            likeCount={999}
            isLike={false}
            authorProfileUrl="/naver-login.svg"
          />
          <TemplateCard
            imageSrc="/naver-login.svg"
            imageAlt="image"
            title="타이틀입니다."
            nickname="불량한 너구리12"
            likeCount={999}
            isLike={false}
            authorProfileUrl="/naver-login.svg"
          />
          <TemplateCard
            imageSrc="/naver-login.svg"
            imageAlt="image"
            title="타이틀입니다."
            nickname="불량한 너구리12"
            likeCount={999}
            isLike={false}
            authorProfileUrl="/naver-login.svg"
          />
          <TemplateCard
            imageSrc="/naver-login.svg"
            imageAlt="image"
            title="타이틀입니다."
            nickname="불량한 너구리12"
            likeCount={999}
            isLike={false}
            authorProfileUrl="/naver-login.svg"
          />
        </DefaultHStack>
      </DefaultVStack>

      <DefaultVStack paddingLeft={8} paddingRight={8} marginBottom={16}>
        <DefaultVStack marginBottom={8} spacing={2}>
          <h4>다양한 템플릿을 만나보세요.</h4>
          <DefaultText size={theme.fontSize.lg}>
            누구든 <StrongText color="primary">5분</StrongText>이면 쉽게 만들 수 있어요 😉
          </DefaultText>
        </DefaultVStack>

        <DefaultHStack spacing={6}>
          <TemplateCard
            imageSrc="/naver-login.svg"
            imageAlt="image"
            title="타이틀입니다."
            nickname="불량한 너구리12"
            likeCount={999}
            isLike={false}
            authorProfileUrl="/naver-login.svg"
          />
          <TemplateCard
            imageSrc="/naver-login.svg"
            imageAlt="image"
            title="타이틀입니다."
            nickname="불량한 너구리12"
            likeCount={999}
            isLike={false}
            authorProfileUrl="/naver-login.svg"
          />
          <TemplateCard
            imageSrc="/naver-login.svg"
            imageAlt="image"
            title="타이틀입니다."
            nickname="불량한 너구리12"
            likeCount={999}
            isLike={false}
            authorProfileUrl="/naver-login.svg"
          />
          <TemplateCard
            imageSrc="/naver-login.svg"
            imageAlt="image"
            title="타이틀입니다."
            nickname="불량한 너구리12"
            likeCount={999}
            isLike={false}
            authorProfileUrl="/naver-login.svg"
          />
        </DefaultHStack>
      </DefaultVStack>

      <DefaultBanner
        type="default"
        linkHref="/login"
        imageSrc="/naver-login.svg"
        imageAlt="배너 테스트"
        title="청첩장 고민은 그만! 씨유레터에서 작별해요."
        description="See you later, at seeyouletter 👋🏻"
      ></DefaultBanner>
    </div>
  );
}

Web.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout isMainPadding={false}>{page}</BaseLayout>;
};
