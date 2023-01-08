import React from 'react';

import { TemplateCard } from '@ui/card';
import { DefaultHStack, DefaultVStack } from '@ui/stack';

interface RecommendedCardListPropsInterface {
  title: string;
  description?: React.ReactNode;
}
export default function RecommendedCardList({
  title,
  description,
}: RecommendedCardListPropsInterface) {
  return (
    <DefaultVStack paddingLeft={8} paddingRight={8} marginBottom={16}>
      <DefaultVStack marginBottom={8} spacing={4}>
        <h4>{title}</h4>
        {description && description}
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
  );
}
