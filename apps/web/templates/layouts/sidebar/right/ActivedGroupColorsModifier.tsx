import React, { useMemo } from 'react';

import { useTheme } from '@emotion/react';

import { useBlockGroupsAtom } from '@hooks/useBlockGroupsAtom';

import {
  Blocks,
  ColorInput,
  DefaultBox,
  DefaultDivider,
  DefaultHStack,
  DefaultInput,
  DefaultVStack,
  Groups,
  StrongText,
} from 'ui';

export function ActivedGroupColorsModifier() {
  const theme = useTheme();

  const { activedBlockGroup } = useBlockGroupsAtom();

  if (activedBlockGroup === null || activedBlockGroup.type === 'block') return <div></div>;

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const blockColors = useMemo(() => {
    if (!activedBlockGroup.id) return [];

    const colorStore: Record<string, { color: string; id: string[]; opacity: string[] }> = {};

    const reculsiveAddColorStore = (node: Blocks | Groups) => {
      if (node.type === 'block') {
        if (node.subType !== 'text') {
          const bg = node.style.bg;
          colorStore[bg] = {
            color: bg,
            id: [...(colorStore[bg]?.id ?? []), node.id],
            opacity: [...new Set([...(colorStore[bg]?.opacity ?? []), node.style.opacity])],
          };
        } else {
          const textColor = node.textStyle.color;
          const textOpacity = node.style.opacity;
          colorStore[textColor] = {
            color: textColor,
            id: [...(colorStore[textColor]?.id ?? []), node.id],
            opacity: [...new Set([...(colorStore[textColor]?.opacity ?? []), textOpacity])],
          };
        }
      } else {
        for (const block of node.blocks) {
          reculsiveAddColorStore(block);
        }
      }
    };

    reculsiveAddColorStore(activedBlockGroup);

    return Object.values(colorStore);
  }, [activedBlockGroup]);

  return (
    <>
      <DefaultVStack spacing={4}>
        <StrongText size={theme.fontSize.sm} color="white">
          그룹 내 색상
        </StrongText>

        <DefaultVStack spacing={1}>
          <DefaultHStack spacing={1}>
            <DefaultBox width="48px">
              <StrongText size={theme.fontSize.xs} color="white">
                색상
              </StrongText>
            </DefaultBox>
            <DefaultBox width="60px">
              <StrongText size={theme.fontSize.xs} color="white">
                번호
              </StrongText>
            </DefaultBox>
            <DefaultBox width="48px">
              <StrongText size={theme.fontSize.xs} color="white">
                투명도
              </StrongText>
            </DefaultBox>
          </DefaultHStack>

          {blockColors.map((blockColor, idx) => (
            <DefaultHStack key={idx} spacing={1}>
              <DefaultBox width="48px">
                <ColorInput
                  aria-label="색상 선택"
                  size="xs"
                  value={blockColor.color}
                  onChange={() => {
                    return;
                  }}
                />
              </DefaultBox>

              <DefaultBox width="60px">
                <DefaultInput
                  aria-label="색상번호 입력"
                  size="xs"
                  placeholder="입력"
                  bgColor={theme.color.darkGray}
                  borderColor={theme.color.darkGray}
                  padding="4px"
                  color="white"
                  value={blockColor.color}
                  onChange={() => {
                    return;
                  }}
                />
              </DefaultBox>

              <DefaultBox width="48px">
                <DefaultInput
                  aria-label="투명도 입력"
                  size="xs"
                  placeholder="입력"
                  bgColor={theme.color.darkGray}
                  borderColor={theme.color.darkGray}
                  padding="4px"
                  color="white"
                  value={blockColor.opacity.length === 1 ? blockColor.opacity[0] : 'mixed'}
                  onChange={() => {
                    return;
                  }}
                />
              </DefaultBox>
            </DefaultHStack>
          ))}
        </DefaultVStack>
      </DefaultVStack>

      <DefaultDivider horizontal size="100%" borderColor="white" />
    </>
  );
}
