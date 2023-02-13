import { FocusEvent, MouseEvent } from 'react';

import { BlockInterface, BlockMembersType, GroupInterface, IdType } from '@ui/types';

export type ClickEvent = (e: MouseEvent, id: string) => void;

interface BlockHoverEventParams {
  id: IdType;
  depth: number;
  order: number;
}

export type BlockHoverEvent = (e: MouseEvent, param: BlockHoverEventParams) => void;

export type ClickEventWithType = (
  e: MouseEvent,
  { type, id, depth, order }: { type: BlockGroupType; id: string; depth: number; order: number }
) => void;

export type BlockGroupType = 'block' | 'group';

export type UpdateTitleEvent = (
  e: FocusEvent,
  { type, id, title }: { type: BlockGroupType; id: string; title: string }
) => void;
export interface CommonStyledBlockInterface {
  depth: number;
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
    GroupInterface {
  depth: number;
  order: number;

  blocks: BlockMembersType;
  activeId: IdType;
  hoverId: IdType;

  onGroupClick: ClickEventWithType;
}

export interface BlockPropsInterface extends BlockEvents, Omit<BlockInterface, 'style'> {
  depth: number;
  order: number;
  activeId: IdType;
  hoverId: IdType;
}
