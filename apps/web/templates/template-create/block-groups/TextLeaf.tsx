import React from 'react';

import { DefaultBox, TextBlock } from 'ui';

interface TextLeafPropsInterface {
  data: TextBlock;
}

export function TextLeaf({ data }: TextLeafPropsInterface) {
  return (
    <DefaultBox
      as="p"
      position="absolute"
      // INFO: TextStyles
      color={data.textStyle.color}
      fontWeight={data.textStyle.fontWeight}
      fontFamily={data.textStyle.fontFamily}
      fontSize={data.textStyle.fontSize}
      lineHeight={data.textStyle.lineHeight}
      // INFO: Size
      width={data.style.size.width}
      height={data.style.size.height}
      // INFO: Position
      top={data.style.position.top}
      right={data.style.position.right}
      bottom={data.style.position.bottom}
      left={data.style.position.left}
      // INFO: Opacity
      opacity={data.style.opacity}
      // INFO: Border
      // NOTE: rgba를 hex로 바꾸는 방법을 탐색한다.
      borderTopColor={data.style.border.top.color}
      borderTopStyle={data.style.border.top.style}
      borderTopWidth={data.style.border.top.width}
      // NOTE: rgba를 hex로 바꾸는 방법을 탐색한다.
      borderRightColor={data.style.border.right.color}
      borderRightStyle={data.style.border.right.style}
      borderRightWidth={data.style.border.right.width}
      // NOTE: rgba를 hex로 바꾸는 방법을 탐색한다.
      borderBottomColor={data.style.border.bottom.color}
      borderBottomStyle={data.style.border.bottom.style}
      borderBottomWidth={data.style.border.bottom.width}
      // NOTE: rgba를 hex로 바꾸는 방법을 탐색한다.
      borderLeftColor={data.style.border.left.color}
      borderLeftStyle={data.style.border.left.style}
      borderLeftWidth={data.style.border.left.width}
      // INFO: BorderRadius
      borderTopLeftRadius={data.style.borderRadius.topLeft}
      borderTopRightRadius={data.style.borderRadius.topRight}
      borderBottomRightRadius={data.style.borderRadius.bottomRight}
      borderBottomLeftRadius={data.style.borderRadius.bottomLeft}
      // INFO: TextStroke
      style={{
        // stylelint-disable-next-line
        WebkitTextStrokeColor: data.textStyle.textStrokeColor,
        // stylelint-disable-next-line
        WebkitTextStrokeWidth: data.textStyle.textStroke,
      }}
    >
      {data.textContent}
    </DefaultBox>
  );
}
