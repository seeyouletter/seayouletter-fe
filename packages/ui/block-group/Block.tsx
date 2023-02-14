import React, { FocusEvent, FormEvent, MouseEvent } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { useContentEditable } from '@common-hooks/useContentEditable';

import { DefaultBox } from '@ui/box';
import { DefaultHStack } from '@ui/stack';

import { BlockPropsInterface, CommonStyledBlockInterface } from './types';

const StyledBlockContainer = styled.div<CommonStyledBlockInterface>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 28px;

  font-size: ${(props) => props.theme.fontSize.xs};

  cursor: pointer;
`;

export function Block({
  activeId,
  hoverId,
  id,
  title,
  onBlockClick,
  onBlockHover,
  onUpdateTitle,
  depth,
  order,
}: BlockPropsInterface) {
  const theme = useTheme();

  const actived = activeId === id;
  const hovered = hoverId === id;

  const {
    ref: contentEditableRef,
    editText,
    titleEditable,
    onEdit,
    onCloseEdit,
    onInputEditText,
  } = useContentEditable({
    defaultValue: title,
  });

  const onBlurTitle = (e: FocusEvent) => {
    onCloseEdit(() => onUpdateTitle(e, { type: 'block', id, title: editText }));
  };

  const onInputTitle = (e: FormEvent) => {
    onInputEditText((e.target as HTMLDivElement).textContent ?? '');
  };

  return (
    <DefaultHStack
      boxSizing="border-box"
      paddingLeft={`${depth * 20}px`}
      borderWidth="1px"
      backgroundColor={
        actived ? theme.color.layout.blockGroupToggle.activeBg : theme.color.transparent
      }
      border={hovered ? theme.border.primaryLight : theme.border.transparent}
    >
      <DefaultBox
        width="20px"
        flexShrink={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        🀆
      </DefaultBox>

      <StyledBlockContainer
        depth={depth}
        ref={contentEditableRef}
        onClick={(e: MouseEvent) => onBlockClick(e, { type: 'block', id, depth, order })}
        contentEditable={titleEditable}
        onDoubleClick={onEdit}
        onBlur={onBlurTitle}
        onInput={onInputTitle}
        onMouseOver={(e: MouseEvent) => onBlockHover(e, { id, depth, order })}
      />
    </DefaultHStack>
  );
}
