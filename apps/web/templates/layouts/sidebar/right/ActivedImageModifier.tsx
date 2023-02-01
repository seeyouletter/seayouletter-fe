import React, { FormEvent } from 'react';

import { useTheme } from '@emotion/react';

import { useBlockGroupsAtom } from '@hooks/useBlockGroupsAtom';

import {
  DefaultButton,
  DefaultHStack,
  DefaultSelect,
  DefaultVStack,
  FullWidthButton,
  StrongText,
} from 'ui';

import { TemplatedInputWithTitlePresenter } from './TemplatedInputWithTitlePresenter';

export function ActivedImageModifier() {
  const theme = useTheme();

  // TODO: updateImageResource, deleteImageResource를 추후 넣어야 한다. (이는 모달에서 제어를 할 것 같다. 업로드와 같이.)
  const { activedBlockGroup, setImageStyle } = useBlockGroupsAtom();

  if (activedBlockGroup === null || activedBlockGroup.subType !== 'image') return <div></div>;

  const onChangeImagePosition = (e: FormEvent, position: 'top' | 'left') => {
    setImageStyle({
      subType: activedBlockGroup.subType,
      type: activedBlockGroup.type,
      id: activedBlockGroup.id,
      imageStyle: {
        ...activedBlockGroup.imageStyle,
        position: {
          ...activedBlockGroup.imageStyle.position,
          [position]: (e.target as HTMLInputElement).value,
        },
      },
    });
  };

  const onChangeImageOpacity = (e: FormEvent) => {
    setImageStyle({
      subType: activedBlockGroup.subType,
      type: activedBlockGroup.type,
      id: activedBlockGroup.id,
      imageStyle: {
        ...activedBlockGroup.imageStyle,
        opacity: (e.target as HTMLInputElement).value,
      },
    });
  };

  return (
    <DefaultVStack spacing={3}>
      <DefaultButton size="xs">{activedBlockGroup.image.imageUrl}</DefaultButton>

      <DefaultHStack spacing={1} alignItems="center">
        <StrongText flexShrink size={theme.fontSize.xs} color="white">
          이미지 스타일
        </StrongText>

        <DefaultSelect
          size="xs"
          width="100%"
          height="24px"
          options={[{ label: '비율 유지하면서 채우기', value: 'contains' }]}
          onChange={() => {
            return;
          }}
          borderRadius={theme.borderRadius.hard}
          color={theme.color.white}
        />
      </DefaultHStack>

      <DefaultHStack spacing={1} alignItems="center">
        <StrongText flexShrink size={theme.fontSize.xs} color="white">
          위치 상세설정
        </StrongText>

        <FullWidthButton
          size="xs"
          borderWidth="1px"
          borderColor={theme.color.white}
          borderRadius={theme.borderRadius.hard}
          backgroundColor={theme.color.transparent}
        >
          설정하기
        </FullWidthButton>
      </DefaultHStack>

      <DefaultHStack justifyContent="space-between" alignItems="center">
        <TemplatedInputWithTitlePresenter
          direction="horizontal"
          title="상하"
          placeholder="입력"
          inputWidth="42px"
          value={activedBlockGroup.imageStyle.position.top}
          onChange={(e) => onChangeImagePosition(e, 'top')}
        />

        <TemplatedInputWithTitlePresenter
          direction="horizontal"
          title="좌우"
          placeholder="입력"
          inputWidth="42px"
          value={activedBlockGroup.imageStyle.position.left}
          onChange={(e) => onChangeImagePosition(e, 'left')}
        />

        <TemplatedInputWithTitlePresenter
          direction="horizontal"
          title="투명도"
          placeholder="입력"
          inputWidth="42px"
          value={activedBlockGroup.imageStyle.opacity}
          onChange={onChangeImageOpacity}
        />
      </DefaultHStack>
    </DefaultVStack>
  );
}
