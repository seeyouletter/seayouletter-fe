import React from 'react';
import { useQuery } from 'react-query';

import styled from '@emotion/styled';

import { TemplateResponse } from '@models/templates/template';

import { baseRequest } from '@apis/API';
import { APIPaths } from '@apis/paths';

import { DefaultHStack, DefaultVStack, TemplateCard } from 'ui';

interface ButtonHeaderPropsInterface extends DefaultHeaderPropsInterface {
  button: React.ReactNode;
}

interface DefaultHeaderPropsInterface {
  title: string;
  description: React.ReactNode;
}

type TemplateCardListPropsInterface = DefaultHeaderPropsInterface &
  Partial<Omit<ButtonHeaderPropsInterface, keyof DefaultHeaderPropsInterface>>;

const StyledCardWrapper = styled.div`
  padding-left: calc(25% - 224px);
  margin-bottom: 24px;
`;

const ButtonHeader = ({ title, description, button }: ButtonHeaderPropsInterface) => (
  <DefaultVStack marginBottom={8} spacing={4}>
    <DefaultHStack justifyContent="space-between">
      {!!title && <h4>{title}</h4>}
      {button}
    </DefaultHStack>
    {description && description}
  </DefaultVStack>
);

const DefaultHeader = ({ title, description }: DefaultHeaderPropsInterface) => {
  return (
    <DefaultVStack marginBottom={8} spacing={4}>
      {!!title && <h4>{title}</h4>}
      {description && description}
    </DefaultVStack>
  );
};

const HeaderFactory = ({ title, description, button }: TemplateCardListPropsInterface) => {
  return button ? (
    <ButtonHeader title={title} description={description} button={button} />
  ) : (
    <DefaultHeader title={title} description={description} />
  );
};

export function TemplateCardList({ title, description, button }: TemplateCardListPropsInterface) {
  const templates = useQuery({
    queryKey: 'getTemplates',
    queryFn: async (): Promise<TemplateResponse[]> => {
      const res = await baseRequest.get<TemplateResponse[]>(APIPaths.getTemplates);

      return res;
    },
  });

  return (
    <DefaultVStack paddingLeft={2} paddingRight={8} marginBottom={16}>
      <HeaderFactory title={title} description={description} button={button} />

      <DefaultHStack flexWrap="wrap">
        {templates?.data?.length &&
          templates?.data?.map((res) => (
            <StyledCardWrapper key={res.id}>
              <TemplateCard
                imageSrc={res.imageSrc}
                imageAlt={res.imageAlt}
                title={res.title}
                nickname={res.nickname}
                likeCount={res.likeCount}
                liked={res.liked}
                authorProfileUrl={res.authorProfileUrl}
              />
            </StyledCardWrapper>
          ))}
      </DefaultHStack>
    </DefaultVStack>
  );
}
