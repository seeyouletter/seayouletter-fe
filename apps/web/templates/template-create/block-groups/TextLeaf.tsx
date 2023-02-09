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
      width={data.style.size.width}
      height={data.style.size.height}
      color={data.textStyle.color}
      top={data.style.position.top}
      right={data.style.position.right}
      bottom={data.style.position.bottom}
      left={data.style.position.left}
      fontWeight={data.textStyle.fontWeight}
      fontFamily={data.textStyle.fontFamily}
      fontSize={data.textStyle.fontSize}
      lineHeight={data.textStyle.lineHeight}
      stroke={data.textStyle.textStroke}
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
