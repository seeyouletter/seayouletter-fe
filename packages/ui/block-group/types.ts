import { FocusEvent, MouseEvent } from 'react';

import { BlockInterface, BlockMembersType, GroupInterface, IdType } from '@ui/types';

export type ClickEvent = (e: MouseEvent, id: string) => void;

export interface BlockGroupPriorities {
  depth: number;
  order: number;
}

interface BlockHoverEventParams extends BlockGroupPriorities {
  id: IdType;
}

export type BlockHoverEvent = (e: MouseEvent, param: BlockHoverEventParams) => void;

export type BlockGroupOptions = {
  isRemovableByBackspace: boolean;
};

export type ClickEventWithType = (
  e: MouseEvent,
  {
    type,
    id,
    depth,
    order,
    options,
  }: { type: BlockGroupType; id: string; options: BlockGroupOptions } & BlockGroupPriorities
) => void;

export type BlockGroupType = 'block' | 'group';

export type UpdateTitleEvent = (
  e: FocusEvent,
  { type, id, title }: { type: BlockGroupType; id: string; title: string }
) => void;
export interface CommonStyledBlockInterface {
  depth: BlockGroupPriorities['depth'];
}

export interface StyledBlockGroupToggleTitleInterface {
  actived: boolean;
  toggleColor?: string;
}

export interface StyledBlockGroupToggleMarkerInterface {
  toggleMarkerBg?: string;
  toggleMarkerToggleBg?: string;
  toggled: boolean;
}

export interface BlockEvents {
  onBlockClick: ClickEventWithType;
  onBlockHover: BlockHoverEvent;
  onUpdateTitle: UpdateTitleEvent;
}
export interface BlockGroupWrapperPropsInterface
  extends StyledBlockGroupToggleMarkerInterface,
    BlockEvents,
    BlockGroupPriorities,
    GroupInterface {
  blocks: BlockMembersType;
  activeId: IdType;
  hoverId: IdType;

  onGroupClick: ClickEventWithType;
}

export interface BlockPropsInterface
  extends BlockEvents,
    BlockGroupPriorities,
    Omit<BlockInterface, 'style'> {
  activeId: IdType;
  hoverId: IdType;
}
