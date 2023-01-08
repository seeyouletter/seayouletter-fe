import React from 'react';

import { TemplateCard } from '@ui/card';
import { DefaultHStack, DefaultVStack } from '@ui/stack';

interface CardListWithButtonPropsInterface {
  title: string;
  description?: React.ReactNode;
  button?: React.ReactNode;
}
export default function CardListWithButton({
  title,
  description,
  button,
}: CardListWithButtonPropsInterface) {
  return (
    <DefaultVStack paddingLeft={8} paddingRight={8} marginBottom={16}>
      <DefaultVStack marginBottom={8} spacing={4}>
        <DefaultHStack justifyContent="space-between">
          <h4>{title}</h4>
          {button}
        </DefaultHStack>
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
