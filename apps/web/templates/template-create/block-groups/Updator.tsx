import React from 'react';

import { useTheme } from '@emotion/react';

import { DefaultBox } from 'ui';

import { NodeItemPropsInterface } from './types';

Updator.Top = function UpdatorTopLine() {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="ns-resize"
      position="absolute"
      zIndex={9999}
      left="0"
      top="-1px"
      width="100%"
      height="2px"
      background={theme.color.primary[200]}
    />
  );
};

Updator.Right = function UpdatorRightLine() {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="ew-resize"
      position="absolute"
      zIndex={9999}
      left="100%"
      top="0"
      width="2px"
      height="100%"
      background={theme.color.primary[200]}
    />
  );
};

Updator.Bottom = function UpdatorLeftLine() {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="ns-resize"
      position="absolute"
      zIndex={9999}
      left="-1px"
      top="100%"
      width="100%"
      height="2px"
      background={theme.color.primary[200]}
    />
  );
};

Updator.Left = function UpdatorBototmLine() {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="ew-resize"
      position="absolute"
      zIndex={9999}
      left="-1px"
      top="0"
      width="2px"
      height="100%"
      background={theme.color.primary[200]}
    />
  );
};

Updator.TopLeftEdge = function UpdatorLeftTopEdge() {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="nwse-resize"
      position="absolute"
      zIndex={10000}
      left="-3px"
      top="-3px"
      width="6px"
      height="6px"
      background={theme.color.white}
      border={theme.border.primaryLight}
    />
  );
};

Updator.TopRightEdge = function TopRightEdge() {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="nesw-resize"
      position="absolute"
      zIndex={10000}
      left="calc(100% - 3px)"
      top="-3px"
      width="6px"
      height="6px"
      background={theme.color.white}
      border={theme.border.primaryLight}
    />
  );
};

Updator.BottomRightEdge = function UpdatorBottomRightEdge() {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="nwse-resize"
      position="absolute"
      zIndex={10000}
      left="calc(100% - 3px)"
      top="calc(100% - 3px)"
      width="6px"
      height="6px"
      background={theme.color.white}
      border={theme.border.primaryLight}
    />
  );
};

Updator.BottomLeftEdge = function UpdatorBottomLeftEdge() {
  const theme = useTheme();

  return (
    <DefaultBox
      cursor="nesw-resize"
      position="absolute"
      zIndex={10000}
      left="-3px"
      top="calc(100% - 3px)"
      width="6px"
      height="6px"
      background={theme.color.white}
      border={theme.border.primaryLight}
    />
  );
};

export function Updator({ item }: NodeItemPropsInterface) {
  // TODO: 추후 지운다.
  // eslint-disable-next-line
  console.log(item);
  return (
    <>
      <Updator.Top />
      <Updator.Right />
      <Updator.Bottom />
      <Updator.Left />

      <Updator.TopLeftEdge />
      <Updator.TopRightEdge />
      <Updator.BottomRightEdge />
      <Updator.BottomLeftEdge />

      {/* <DefaultBox
        border={activedBlockGroup?.id === item.id ? '10px solid orange' : 'none'}
        onDoubleClickCapture={() => {
          if (activedBlockGroup?.type === 'group') {
            if ((activedBlockGroup as Groups).blocks.find((v) => v.id === item.id)) {
              setActiveId(item.type, item.id);
            }
          }
        }}
      /> */}
    </>
  );
}
