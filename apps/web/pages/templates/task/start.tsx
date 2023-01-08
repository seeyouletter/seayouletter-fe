import React from 'react';

import { useTheme } from '@emotion/react';

import BaseLayout from 'layouts/BaseLayout';

import { FreeSizeButton } from '@ui/button';
import { DefaultHStack, DefaultVStack } from '@ui/stack';
import { DefaultText } from '@ui/text';

const Buttons = [
  {
    id: 'button1',
    contents: ['씨유레터의 템플릿을', '참고할게요!'],
    onClick: () => {
      return;
    },
  },
  {
    id: 'button2',
    contents: ['다른 사람들의 템플릿을', '참고할게요!'],
    onClick: () => {
      return;
    },
  },
  {
    id: 'button3',
    contents: ['제가 처음부터', '직접 만들어볼게요!'],
    onClick: () => {
      return;
    },
  },
];
export default function TaskStartGuideLinePage() {
  const theme = useTheme();

  return (
    <DefaultHStack justifyContent="space-between">
      {Buttons.map((buttonInner) => (
        <FreeSizeButton
          key={buttonInner.id}
          width="300px"
          height="240px"
          borderRadius="rounded"
          bg="white"
          hoverBg="primary.500"
          activeBg="primary.500"
          hoverColor="white"
          activeColor="white"
        >
          <DefaultVStack>
            {buttonInner.contents.map((content, idx) => (
              <DefaultText
                key={idx + buttonInner.id}
                textAlign="center"
                bold
                size={theme.fontSize.lg}
                color="inherit"
              >
                {content}
              </DefaultText>
            ))}
          </DefaultVStack>
        </FreeSizeButton>
      ))}
    </DefaultHStack>
  );
}

TaskStartGuideLinePage.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout isMainPadding={true}>{page}</BaseLayout>;
};
