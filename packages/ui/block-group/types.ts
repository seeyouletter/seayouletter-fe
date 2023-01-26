import { FocusEvent, MouseEvent } from 'react';

export type ClickEvent = (e: MouseEvent, id: string) => void;
export type BlockMemberType = BlockInterface | GroupInterface;
export type BlockMembersType = BlockMemberType[];
export type IdType = string | null;
export type BlockGroupType = 'block' | 'group';

export type UpdateTitleEvent = (
  e: FocusEvent,
  { type, id, title }: { type: BlockGroupType; id: string; title: string }
) => void;
export interface CommonStyledBlockInterface {
  depth: number;
  actived?: boolean;
}

export interface GroupInterface {
  /**
   * @inner parent
   * parent property는 perentGroup이 있을 수 있다면, 이를 아이디로 가리킨다.
   * 단방향 연결리스트를 통해 Group의 계층을 flat하게 관리하여 데이터로 주고받기 위함이다.
   */
  type: 'group';
  parent: IdType;
  id: string;
  title: string;
  order: number;
  toggled: boolean;
  blocks: BlockMembersType;
}

export interface BlockInterface {
  type: 'block';
  parent: IdType;
  id: string;
  title: string;
  order: number;
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

export interface BlockGroupWrapperPropsInterface
  extends StyledBlockGroupToggleMarkerInterface,
    Omit<GroupInterface, 'order'> {
  depth: number;
  blocks: BlockMembersType;
  activeId: IdType;
  onGroupClick: ClickEvent;
  onBlockClick: ClickEvent;
  onUpdateTitle: UpdateTitleEvent;
}

export interface BlockPropsInterface extends Omit<BlockInterface, 'order'> {
  depth: number;
  onBlockClick: ClickEvent;
  activeId: IdType;
  onUpdateTitle: UpdateTitleEvent;
}
