import { MouseEvent } from 'react';

export type ClickEvent = (e: MouseEvent, id: string) => void;
export type BlockMemberType = BlockInterface | GroupInterface;
export type BlockMembersType = BlockMemberType[];
export type IdType = string | null;

export interface CommonStyledBlockInterface {
  actived?: boolean;
}

export interface GroupInterface {
  /**
   * @inner parent
   * parent property는 perentGroup이 있을 수 있다면, 이를 아이디로 가리킨다.
   * 단방향 연결리스트를 통해 Group의 계층을 flat하게 관리하여 데이터로 주고받기 위함이다.
   */
  parent: IdType;
  type: 'group';
  id: string;
  title: string;
  blocks: BlockMembersType;
}

export interface BlockInterface {
  type: 'block';
  id: string;
  title: string;
}

export interface StyledBlockGroupToggleTitleInterface {
  actived: boolean;
  toggleColor?: string;
}

export interface StyledBlockGroupToggleMarkerInterface {
  toggleMarkerBg?: string;
  toggleMarkerToggleBg?: string;
  toggled?: boolean;
}

export interface BlockGroupWrapperPropsInterface
  extends StyledBlockGroupToggleMarkerInterface,
    GroupInterface {
  blocks: BlockMembersType;
  activeId: IdType;
  onGroupClick: ClickEvent;
  onBlockClick: ClickEvent;
}

export interface BlockPropsInterface extends BlockInterface {
  onBlockClick: ClickEvent;
  activeId: IdType;
}
