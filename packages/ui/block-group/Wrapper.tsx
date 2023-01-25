import { FocusEvent, FormEvent, MouseEvent } from 'react';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { DefaultBox } from '@ui/box';
import { DefaultVStack } from '@ui/stack';

import { useContentEditable } from '@common-hooks/useContentEditable';

/* eslint-disable-next-line import/no-cycle */
import { BlockGroupMemberList } from './MemberList';
import {
  BlockGroupWrapperPropsInterface,
  StyledBlockGroupToggleMarkerInterface,
  StyledBlockGroupToggleTitleInterface,
} from './types';

const StyledBlockGroupToggleMarker = styled.div<StyledBlockGroupToggleMarkerInterface>`
  position: absolute;

  margin-left: 8px;

  border-top: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 4px solid ${({ toggleMarkerBg }) => toggleMarkerBg};

  transition: all 0.3s;

  ${({ toggled, toggleMarkerToggleBg }) =>
    toggled &&
    css`
      border-left: 4px solid ${toggleMarkerToggleBg};
      transform: rotate(90deg);
      transform-origin: 25% 50%;
    `}
`;

const StyledBlockGroupToggleTitle = styled.div<StyledBlockGroupToggleTitleInterface>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: 20px;
  font-size: ${(props) => props.theme.fontSize.xs};

  ${({ actived, theme }) =>
    actived &&
    css`
      font-weight: ${theme.fontWeight.bold};
    `}
`;

export function BlockGroupWrapper({
  parent,
  id,
  title,
  activeId,
  toggled = true,
  onGroupClick,
  onBlockClick,
  blocks,
  onUpdateTitle,
}: BlockGroupWrapperPropsInterface) {
  const isActive = activeId === id;

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

  const theme = useTheme();

  if (id === 'subcomponent1') {
  }

  const onWrapperClick = (e: MouseEvent) => {
    if (titleEditable) return;
    onGroupClick(e, id);
  };

  const onBlurTitle = (e: FocusEvent) => {
    if (titleEditable) {
      onCloseEdit(() => onUpdateTitle(e, { type: 'group', id, title: editText }));
    }
  };

  const onInputTitle = (e: FormEvent) => {
    onInputEditText((e.target as HTMLDivElement).textContent ?? '');
  };

  return (
    <DefaultVStack fontSize={theme.fontSize.sm}>
      <DefaultBox
        id={id}
        cursor="pointer"
        backgroundColor={
          isActive ? theme.color.layout.blockGroupToggle.activeBg : theme.color.transparent
        }
        _hover={{
          background: theme.color.layout.blockGroupToggle.activeBg,
        }}
        color={theme.color.white}
        display="flex"
        alignItems="center"
        height="24px"
        position="relative"
        onClick={onWrapperClick}
      >
        <StyledBlockGroupToggleMarker
          toggleMarkerBg={theme.color.white}
          toggleMarkerToggleBg={theme.color.white}
          toggled={toggled}
        />
        <StyledBlockGroupToggleTitle
          ref={contentEditableRef}
          actived={activeId === id}
          onDoubleClickCapture={onEdit}
          onInput={onInputTitle}
          onBlur={onBlurTitle}
          contentEditable={titleEditable}
        />
      </DefaultBox>

      {toggled && (
        <BlockGroupMemberList
          parent={parent}
          activeId={activeId}
          actived={activeId === id}
          members={blocks}
          onBlockClick={onBlockClick}
          onGroupClick={onGroupClick}
          onUpdateTitle={onUpdateTitle}
        />
      )}
    </DefaultVStack>
  );
}
