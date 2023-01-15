import React, { FocusEvent, FormEvent, MouseEvent, useEffect, useRef } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useContentEditable } from '@common-hooks/useContentEditable';

import { BlockPropsInterface, CommonStyledBlockInterface } from './types';

const StyledBlockContainer = styled.div<CommonStyledBlockInterface>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
  margin-left: 20px;
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

export function Block({ id, title, onBlockClick, activeId, onUpdateTitle }: BlockPropsInterface) {
  const actived = activeId === id;

  const contentEditableRef = useRef<HTMLDivElement | null>(null);

  const { editText, titleEditable, onEdit, onCloseEdit, onInputEditText } = useContentEditable({
    defaultValue: title,
  });

  const onBlurTitle = (e: FocusEvent) => {
    onCloseEdit(() => onUpdateTitle(e, { type: 'block', id, title: editText }));
  };

  const onInputTitle = (e: FormEvent) => {
    onInputEditText((e.target as HTMLDivElement).textContent ?? '');
  };

  useEffect(() => {
    (contentEditableRef.current as HTMLDivElement).textContent = editText;
  }, [editText]);

  return (
    <StyledBlockContainer
      ref={contentEditableRef}
      onClick={(e: MouseEvent) => onBlockClick(e, id)}
      actived={actived}
      contentEditable={titleEditable}
      onDoubleClick={onEdit}
      onBlur={onBlurTitle}
      onInput={onInputTitle}
    />
  );
}
