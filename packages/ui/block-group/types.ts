import { FocusEvent, MouseEvent } from 'react';

import { BlockInterface, BlockMembersType, GroupInterface, IdType } from '@ui/types';

export type ClickEvent = (e: MouseEvent, id: string) => void;

export type ClickEventWithType = (
  e: MouseEvent,
  { type, id }: { type: BlockGroupType; id: string }
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
  onUpdateTitle: UpdateTitleEvent;
}
export interface BlockGroupWrapperPropsInterface
  extends StyledBlockGroupToggleMarkerInterface,
    BlockEvents,
    GroupInterface {
  depth: number;

  blocks: BlockMembersType;
  activeId: IdType;

  onGroupClick: ClickEventWithType;
}

export interface BlockPropsInterface extends BlockEvents, Omit<BlockInterface, 'style'> {
  depth: number;
  activeId: IdType;
}
