import React from 'react';

import Image from 'next/image';

import { Avatar, Button } from '@chakra-ui/react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import HeartEmptyIcon from '@ui/icon/HeartEmpty';
import HeartFillIcon from '@ui/icon/HeartFill';
import { DefaultHStack, DefaultVStack } from '@ui/stack';
import { DefaultText } from '@ui/text';
import { ImageInterface } from '@ui/types';
import { Like } from '@ui/types';

interface TemplateCardPropsInterface extends ImageInterface, Like {
  imageSrc: string;
  imageAlt: string;
  title: string;
  nickname: string;
  authorProfileUrl: string;
}

const StyledImage = styled(Image)`
  width: 192px;
  height: 260px;
  background-color: ${({ theme }) => theme.color.sub[500]};
`;

export function TemplateCard({
  imageSrc,
  imageAlt,
  title,
  nickname,
  authorProfileUrl,
  likeCount,
  liked = false,
}: TemplateCardPropsInterface) {
  const theme = useTheme();

  return (
    <Button
      padding="20px"
      width="224px"
      height="360px"
      borderRadius={theme.borderRadius.soft}
      background={theme.color.white}
      border={theme.border.default}
      _hover={{
        background: 'sub.200',
      }}
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
    >
      <DefaultVStack spacing={4}>
        <StyledImage width={192} height={260} src={imageSrc} alt={imageAlt} />

        <DefaultVStack spacing={2}>
          <DefaultText bold>{title}</DefaultText>

          <DefaultHStack
            className="template-card__detail-box card-detail"
            justifyContent="space-between"
          >
            <DefaultHStack spacing={1} alignItems="center">
              <Avatar size="2xs" name={nickname} src={authorProfileUrl} />
              <DefaultText size="12px">{nickname}</DefaultText>
            </DefaultHStack>

            <DefaultHStack spacing={1} alignItems="center">
              <DefaultText size="12px">{likeCount}</DefaultText>
              {liked ? <HeartFillIcon /> : <HeartEmptyIcon />}
            </DefaultHStack>
          </DefaultHStack>
        </DefaultVStack>
      </DefaultVStack>
    </Button>
  );
}
