import React from 'react';

import { IconWithTextButton, PrevArrow } from 'ui';

export function PrevButton() {
  return (
    <IconWithTextButton
      colorScheme="primary.500"
      iconSpacing={2}
      shape="ghost"
      leftIcon={<PrevArrow size="24px" />}
      size="md"
    >
      이전 페이지로 이동
    </IconWithTextButton>
  );
}
