import React from 'react';

import { useTheme } from '@emotion/react';

import { DefaultDivider, DefaultHStack, DefaultVStack, StrongText } from 'ui';

import { useBlockGroupsAtom } from '@hooks/useBlockGroupsAtom';

import { TemplatedInputWithTitlePresenter } from './TemplatedInputWithTitlePresenter';

/* eslint-disable no-console */
export function ActivedTextModifier() {
  const theme = useTheme();
  const {
    activedBlockGroup,
    setTextColor,
    setTextFontSize,
    setTextLetterSpacing,
    setTextLineHeight,
    setTextFontWeight,
    setTextStroke,
    setTextStrokeColor,
    setTextFontFamily,
    setTextFontStyle,
  } = useBlockGroupsAtom();

  if (activedBlockGroup === null || activedBlockGroup.subType !== 'text') return <div></div>;

  return (
    <>
      <DefaultVStack spacing={4}>
        <StrongText color="white" size={theme.fontSize.sm}>
          글자 속성
        </StrongText>

        <DefaultVStack spacing={2}>
          <DefaultHStack justifyContent="space-between">
            <TemplatedInputWithTitlePresenter
              direction="horizontal"
              title="크기"
              placeholder="입력"
              value={activedBlockGroup.textStyle.fontSize}
              onChange={(e) => {
                setTextFontSize({
                  subType: activedBlockGroup.subType,
                  id: activedBlockGroup.id,
                  value: (e.target as HTMLInputElement).value,
                });
              }}
            />

            <TemplatedInputWithTitlePresenter
              direction="horizontal"
              title="굵기"
              placeholder="입력"
              value={activedBlockGroup.textStyle.fontWeight}
              onChange={(e) => {
                setTextFontWeight({
                  subType: activedBlockGroup.subType,
                  id: activedBlockGroup.id,
                  value: (e.target as HTMLInputElement).value,
                });
              }}
            />
          </DefaultHStack>

          <DefaultHStack justifyContent="space-between">
            <TemplatedInputWithTitlePresenter
              direction="horizontal"
              title="색상"
              placeholder="입력"
              value={activedBlockGroup.textStyle.color}
              onChange={(e) => {
                setTextColor({
                  subType: activedBlockGroup.subType,
                  id: activedBlockGroup.id,
                  value: (e.target as HTMLInputElement).value,
                });
              }}
            />

            <TemplatedInputWithTitlePresenter
              direction="horizontal"
              title="스타일"
              placeholder="입력"
              value={activedBlockGroup.textStyle.fontStyle}
              onChange={(e) => {
                setTextFontStyle({
                  subType: activedBlockGroup.subType,
                  id: activedBlockGroup.id,
                  value: (e.target as HTMLInputElement).value,
                });
              }}
            />
          </DefaultHStack>

          <DefaultHStack justifyContent="space-between">
            <TemplatedInputWithTitlePresenter
              direction="horizontal"
              title="자간"
              placeholder="입력"
              value={activedBlockGroup.textStyle.letterSpacing}
              onChange={(e) => {
                setTextLetterSpacing({
                  subType: activedBlockGroup.subType,
                  id: activedBlockGroup.id,
                  value: (e.target as HTMLInputElement).value,
                });
              }}
            />

            <TemplatedInputWithTitlePresenter
              direction="horizontal"
              title="줄높이"
              placeholder="입력"
              value={activedBlockGroup.textStyle.lineHeight}
              onChange={(e) => {
                setTextLineHeight({
                  subType: activedBlockGroup.subType,
                  id: activedBlockGroup.id,
                  value: (e.target as HTMLInputElement).value,
                });
              }}
            />
          </DefaultHStack>

          <DefaultHStack justifyContent="space-between">
            <TemplatedInputWithTitlePresenter
              direction="horizontal"
              title="둘레"
              placeholder="입력"
              value={activedBlockGroup.textStyle.textStroke}
              onChange={(e) => {
                setTextStroke({
                  subType: activedBlockGroup.subType,
                  id: activedBlockGroup.id,
                  value: (e.target as HTMLInputElement).value,
                });
              }}
            />

            <TemplatedInputWithTitlePresenter
              direction="horizontal"
              title="둘레색상"
              placeholder="입력"
              value={activedBlockGroup.textStyle.textStrokeColor}
              onChange={(e) => {
                setTextStrokeColor({
                  subType: activedBlockGroup.subType,
                  id: activedBlockGroup.id,
                  value: (e.target as HTMLInputElement).value,
                });
              }}
            />
          </DefaultHStack>

          <DefaultHStack justifyContent="space-between">
            <TemplatedInputWithTitlePresenter
              direction="horizontal"
              title="글꼴"
              inputWidth="200px"
              placeholder="입력"
              value={activedBlockGroup.textStyle.fontFamily}
              onChange={(e) => {
                setTextFontFamily({
                  subType: activedBlockGroup.subType,
                  id: activedBlockGroup.id,
                  value: (e.target as HTMLInputElement).value,
                });
              }}
            />
          </DefaultHStack>
        </DefaultVStack>
      </DefaultVStack>
      <DefaultDivider horizontal size="100%" borderColor={theme.color.white}></DefaultDivider>
    </>
  );
}
