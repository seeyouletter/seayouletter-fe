import React from 'react';

import { useTheme } from '@emotion/react';

import { DefaultBox, GroupBlockSize, Position } from 'ui';

interface BlockPreviewerPropsInterface {
  width: GroupBlockSize['width'];
  height: GroupBlockSize['height'];
  top: Position['top'];
  left: Position['left'];
}
export function BlockPreviewer({ width, height, top, left }: BlockPreviewerPropsInterface) {
  const theme = useTheme();

  return (
    <DefaultBox
      position="absolute"
      width={width}
      height={height}
      top={top}
      left={left}
      border={theme.border.primary}
      backgroundColor={'rgba(0,155,159,0.25)'}
    />
  );
}
