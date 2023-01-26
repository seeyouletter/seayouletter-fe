import React, { FocusEvent, FormEvent, MouseEvent } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DefaultBox } from '@ui/box';
import { DefaultHStack } from '@ui/stack';

import { useContentEditable } from '@common-hooks/useContentEditable';

import { BlockPropsInterface, CommonStyledBlockInterface } from './types';

const StyledBlockContainer = styled.div<CommonStyledBlockInterface>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 28px;

  font-size: ${(props) => props.theme.fontSize.xs};

  cursor: pointer;

  ${({ actived, theme }) =>
    actived &&
    css`
      font-weight: ${theme.fontWeight.bold};
      background-color: ${theme.color.layout.blockGroupToggle.activeBg};
    `}
  &:hover {
    background-color: ${(props) => props.theme.color.layout.blockGroupToggle.activeBg};
  }
`;

export function Block({
  id,
  title,
  onBlockClick,
  activeId,
  onUpdateTitle,
  depth,
}: BlockPropsInterface) {
  const actived = activeId === id;

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
    <DefaultHStack paddingLeft={`${depth * 20}px`} borderWidth="1px">
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
        onClick={(e: MouseEvent) => onBlockClick(e, id)}
        actived={actived}
        contentEditable={titleEditable}
        onDoubleClick={onEdit}
        onBlur={onBlurTitle}
        onInput={onInputTitle}
      ></StyledBlockContainer>
    </DefaultHStack>
  );
}
