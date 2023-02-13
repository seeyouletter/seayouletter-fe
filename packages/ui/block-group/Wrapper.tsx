import { FocusEvent, FormEvent, MouseEvent } from 'react';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { useContentEditable } from '@common-hooks/useContentEditable';

import { DefaultBox } from '@ui/box';
import { DefaultVStack } from '@ui/stack';

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
  depth,
  order,
  id,
  title,
  activeId,
  hoverId,
  toggled = true,
  onGroupClick,
  onBlockClick,
  onBlockHover,
  blocks,
  onUpdateTitle,
}: BlockGroupWrapperPropsInterface) {
  const isActive = activeId === id;
  const isHover = hoverId === id;

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
    onGroupClick(e, { type: 'group', id, depth, order });
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
    <DefaultVStack fontSize={theme.fontSize.sm} boxSizing="border-box">
      <DefaultBox
        id={id}
        cursor="pointer"
        boxSizing="border-box"
        backgroundColor={
          isActive ? theme.color.layout.blockGroupToggle.activeBg : theme.color.transparent
        }
        border={isHover ? theme.border.primaryLight : theme.border.transparent}
        borderBottom={isHover && !toggled ? theme.border.primaryLight : theme.border.transparent}
        color={theme.color.white}
        display="flex"
        alignItems="center"
        height="28px"
        position="relative"
        onClick={onWrapperClick}
        paddingLeft={`${depth * 20}px`}
        onMouseOver={(e) => onBlockHover(e, { id, depth, order })}
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
          depth={depth + 1}
          activeId={activeId}
          hoverId={hoverId}
          hovered={hoverId === id}
          actived={activeId === id}
          members={blocks}
          onBlockClick={onBlockClick}
          onGroupClick={onGroupClick}
          onBlockHover={onBlockHover}
          onUpdateTitle={onUpdateTitle}
        />
      )}
    </DefaultVStack>
  );
}
