import React from 'react';

import { useTheme } from '@emotion/react';

import { DefaultButton, DefaultVStack, StrongText } from 'ui';

import { ActivedImageModifier } from '@templates/layouts/sidebar/right/ActivedImageModifier';

import { BlockSubType } from './types';

interface BlockImageDecoratorPropsInterface {
  subType: BlockSubType;
}
export function BlockImageModifier({ subType }: BlockImageDecoratorPropsInterface) {
  const theme = useTheme();

  return (
    <>
      <DefaultVStack spacing={5}>
        <DefaultVStack spacing={1}>
          <StrongText size={theme.fontSize.sm} color="white">
            이미지 채우기
          </StrongText>

          {subType === 'image' ? (
            <ActivedImageModifier />
          ) : (
            <DefaultVStack spacing={1}>
              <StrongText size={theme.fontSize.sm} color="white">
                이미지 채우기
              </StrongText>
              <DefaultButton
                borderWidth="1px"
                borderColor={theme.color.white}
                borderRadius={theme.borderRadius.soft}
                backgroundColor={theme.color.transparent}
              >
                업로드
              </DefaultButton>
            </DefaultVStack>
          )}
        </DefaultVStack>
      </DefaultVStack>
    </>
  );
}
