import { MouseEvent } from 'react';

export type ClickEvent = (e: MouseEvent, id: string) => void;
export type BlockMembersType = (BlockInterface | GroupInterface)[];
export type ActiveIdType = string | null;

export interface CommonStyledBlockInterface {
  actived?: boolean;
}

export interface GroupInterface {
  type: string;
  id: string;
  title: string;
  blocks: BlockMembersType;
}

export interface BlockInterface {
  type: string;
  id: string;
  title: string;
}

export interface StyledBlockGroupToggleTitleInterface {
  toggleColor?: string;
}

export interface StyledBlockGroupToggleMarkerInterface {
  toggleMarkerBg?: string;
  toggleMarkerToggleBg?: string;
  toggled?: boolean;
}

export interface BlockGroupWrapperPropsInterface
  extends StyledBlockGroupToggleMarkerInterface,
    StyledBlockGroupToggleTitleInterface,
    GroupInterface {
  blocks: BlockMembersType;
  activeId: ActiveIdType;
  onGroupClick: ClickEvent;
  onBlockClick: ClickEvent;
}

export interface BlockPropsInterface extends BlockInterface {
  onBlockClick: ClickEvent;
  activeId: ActiveIdType;
}
