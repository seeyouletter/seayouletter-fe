import React from 'react';

import { useTheme } from '@emotion/react';

import { DefaultBox } from '@ui/Box';
import { MyTemplateCard } from '@ui/card';
import { DefaultHStack } from '@ui/stack';

import { MytemplateListModalInnerPropsInterface } from './types';

export function MyTemplateList({ templates }: MytemplateListModalInnerPropsInterface) {
  const theme = useTheme();
  return (
    <DefaultBox height="360px" border={theme.border.default} overflowY="scroll" width="60vw">
      <DefaultHStack paddingRight="24px" display="flex" flexWrap="wrap">
        {templates.map((template) => (
          <DefaultBox key={template.id} paddingTop="24px" paddingBottom="24px" paddingLeft="24px">
            <MyTemplateCard
              id={template.id}
              title={template.title}
              imageAlt={template.imageAlt}
              imageSrc={template.imageSrc}
              createAt={template.createAt}
              lastUpdateAt={template.lastUpdateAt}
            />
          </DefaultBox>
        ))}
      </DefaultHStack>
    </DefaultBox>
  );
}
