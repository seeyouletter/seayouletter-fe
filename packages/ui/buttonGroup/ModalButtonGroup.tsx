import React from 'react';

import { useTheme } from '@emotion/react';

import { DefaultBox } from '@ui/Box';
import { DefaultButton } from '@ui/button/Default';
import { DefaultHStack } from '@ui/stack';

import { ModalButtonGroupPropsInterface } from './types';

export function ModalButtonGroup({
  onConfirmButtonClick,
  onCancelButtonClick,
}: ModalButtonGroupPropsInterface) {
  const theme = useTheme();

  return (
    <DefaultBox display="flex" justifyContent="flex-end">
      <DefaultHStack width="240px" justifyContent="space-between">
        <DefaultButton width="108px" onClick={onConfirmButtonClick}>
          네
        </DefaultButton>
        <DefaultButton width="108px" bg={theme.color.error} onClick={onCancelButtonClick}>
          아니요
        </DefaultButton>
      </DefaultHStack>
    </DefaultBox>
  );
}
