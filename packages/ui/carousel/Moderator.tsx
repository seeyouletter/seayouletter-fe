import React from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { useTheme } from '@emotion/react';

import { IconButton } from '@ui/button';
import { DefaultDivider } from '@ui/divider';
import { DefaultHStack } from '@ui/stack';
import { DefaultText } from '@ui/text';

import {
  StyledCarouselCounter,
  StyledCarouselModerator,
  StyledProgressBarContainer,
  StyledProgressBarInner,
  StyledProgressBarRail,
  StyledProgressBarTrack,
} from './styles';

interface CarouselModeratorPropsInterface {
  nowIndex: number;
  totalLength: number;
  onPrev: () => void;
  onNext: () => void;
  timerId: NodeJS.Timeout | number;
}

export function CarouselModerator({
  nowIndex,
  totalLength,
  onPrev,
  onNext,
  timerId,
}: CarouselModeratorPropsInterface) {
  const theme = useTheme();
  return (
    <StyledCarouselModerator>
      <IconButton
        size="xs"
        role="button"
        ariaLabel="캐러셀 뒤로가기 버튼"
        bg="transparent"
        hoverBg="primary.500"
        activeBg="primary.500"
        icon={<ChevronLeftIcon boxSize={6} color="white" />}
        onClick={onPrev}
      />

      <DefaultHStack
        divider={<DefaultDivider borderColor="sub.500" size="16px" />}
        spacing={12}
        alignItems="center"
      >
        <StyledCarouselCounter>
          <DefaultText color={theme.color.primary[200]} bold>
            {(nowIndex < 10 ? '0' : '') + Math.min(Math.max(nowIndex, 1), totalLength)}
          </DefaultText>
        </StyledCarouselCounter>

        <StyledCarouselCounter>
          <DefaultText color="white" bold>
            {(totalLength < 10 ? '0' : '') + totalLength}
          </DefaultText>
        </StyledCarouselCounter>
      </DefaultHStack>

      <IconButton
        size="xs"
        role="button"
        ariaLabel="캐러셀 다음으로 가기 버튼"
        bg="transparent"
        hoverBg="primary.500"
        activeBg="primary.500"
        icon={<ChevronRightIcon boxSize={6} color="white" />}
        onClick={onNext}
      />

      <StyledProgressBarContainer>
        <StyledProgressBarInner>
          <StyledProgressBarRail />
          <StyledProgressBarTrack key={timerId as number} />
        </StyledProgressBarInner>
      </StyledProgressBarContainer>
    </StyledCarouselModerator>
  );
}
