export type IdType = string | null;

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
  toggled: boolean;
  blocks: BlockMembersType;
}

export interface BlockInterface {
  type: 'block';
  parent: IdType;
  id: string;
  title: string;
  style: BlockStyles;
}

export type BlockMemberType = BlockInterface | GroupInterface;
export type BlockMembersType = BlockMemberType[];

export interface Position {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export interface Border {
  width: string;
  style: string;
  color: string;
}

export type Directions = 'top' | 'right' | 'bottom' | 'left';
export type EdgeDirections = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface BlockStyles extends ComponentSize {
  position: Position;

  bg: string;

  border: Record<Directions, Border>;
  borderRadius: Record<EdgeDirections, string>;
}

export type ObjectFit = 'cover' | 'contains' | 'fill' | 'none' | 'scale-down';

export interface ComponentSize {
  width: string;
  height: string;
}

export interface ImageStyle {
  opacity: number;
  objectFit: ObjectFit;
  position: {
    top: Position['top'];
    left: Position['left'];
  };
}

export interface ImageBlock extends BlockInterface {
  subType: 'image';
  image: {
    imageUrl: string;
    imageName: string;
  };
  imageStyle: ImageStyle;
}

export interface ShapeBlock extends BlockInterface {
  subType: 'shape';

  style: BlockStyles;
}
