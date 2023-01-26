import React from 'react';

import styled from '@emotion/styled';

import { DefaultHStack, DefaultVStack, TemplateCard } from 'ui';

interface TemplateCardListPropsInterface {
  title?: string;
  description?: React.ReactNode;
  button?: React.ReactNode;
}

const StyledCardWrapper = styled.div`
  padding-left: calc(25% - 224px);
  margin-bottom: 24px;
`;

const HeaderFactory = ({ title, description, button }: TemplateCardListPropsInterface) => {
  return button ? (
    <DefaultVStack marginBottom={8} spacing={4}>
      <DefaultHStack justifyContent="space-between">
        {!!title && <h4>{title}</h4>}
        {button}
      </DefaultHStack>
      {description && description}
    </DefaultVStack>
  ) : (
    <DefaultVStack marginBottom={8} spacing={4}>
      {!!title && <h4>{title}</h4>}
      {description && description}
    </DefaultVStack>
  );
};

export function TemplateCardList({ title, description, button }: TemplateCardListPropsInterface) {
  return (
    <DefaultVStack paddingLeft={2} paddingRight={8} marginBottom={16}>
      <HeaderFactory title={title} description={description} button={button} />

      <DefaultHStack flexWrap="wrap">
        <StyledCardWrapper>
          <TemplateCard
            imageSrc="/naver-login.svg"
            imageAlt="image"
            title="타이틀입니다."
            nickname="불량한 너구리12"
            likeCount={999}
            liked={false}
            authorProfileUrl="/naver-login.svg"
          />
        </StyledCardWrapper>
        <StyledCardWrapper>
          <TemplateCard
            imageSrc="/naver-login.svg"
            imageAlt="image"
            title="타이틀입니다."
            nickname="불량한 너구리12"
            likeCount={999}
            liked={false}
            authorProfileUrl="/naver-login.svg"
          />
        </StyledCardWrapper>
        <StyledCardWrapper>
          <TemplateCard
            imageSrc="/naver-login.svg"
            imageAlt="image"
            title="타이틀입니다."
            nickname="불량한 너구리12"
            likeCount={999}
            liked={false}
            authorProfileUrl="/naver-login.svg"
          />
        </StyledCardWrapper>
        <StyledCardWrapper>
          <TemplateCard
            imageSrc="/naver-login.svg"
            imageAlt="image"
            title="타이틀입니다."
            nickname="불량한 너구리12"
            likeCount={999}
            liked={false}
            authorProfileUrl="/naver-login.svg"
          />
        </StyledCardWrapper>
      </DefaultHStack>
    </DefaultVStack>
  );
}
