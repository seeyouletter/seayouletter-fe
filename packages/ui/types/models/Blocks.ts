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

export interface DefaultGroup extends GroupInterface {
  subType: 'default';
}

export interface AnimatorGroup extends GroupInterface {
  subType: 'animator';
}

export interface CommonBlockStyles {
  position: Position;
  size: GroupBlockSize;

  opacity: string;

  border: Record<Directions, Border>;
  borderRadius: Record<EdgeDirections, string>;
}

export interface BlockInterface {
  type: 'block';
  parent: IdType;
  id: string;
  title: string;
  style: CommonBlockStyles;
}

export type Blocks = ShapeBlock | ImageBlock | TextBlock;
export type NonTextBlock = ShapeBlock | ImageBlock;

export type Groups = DefaultGroup | AnimatorGroup;

export type BlockMemberType = Blocks | Groups;
export type BlockMembersType = BlockMemberType[];

export interface Position {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

type LineStyle =
  | 'dashed'
  | 'dotted'
  | 'double'
  | 'groove'
  | 'hidden'
  | 'inset'
  | 'none'
  | 'outset'
  | 'ridge'
  | 'solid';

export interface Border {
  width: string;
  style: LineStyle;
  color: string;
  opacity: string;
}

export type Directions = 'top' | 'right' | 'bottom' | 'left';
export type EdgeDirections = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface NonTextBlockStylesInterface extends CommonBlockStyles {
  bg: string;
}

export type ObjectFit = 'cover' | 'contains' | 'fill' | 'none' | 'scale-down';

export interface GroupBlockSize {
  width: string;
  height: string;
}

export interface ImageStyle {
  opacity: string;
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
  style: NonTextBlockStylesInterface;
}

export interface ShapeBlock extends BlockInterface {
  subType: 'shape';

  style: NonTextBlockStylesInterface;
}

interface TextStyles {
  color: string;
  fontSize: string;
  fontWeight: string;
  textStroke: string;
  textStrokeColor: string;
  letterSpacing: string;
  lineHeight: string;
  fontStyle: '기울어지게' | '기본';
  fontFamily: string;
}

export interface TextBlock extends BlockInterface {
  subType: 'text';

  style: CommonBlockStyles;
  textStyle: TextStyles;
  textContent: string;
}

export enum DirectionsContstants {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

export enum EdgeDirectionsContstants {
  topLeft = 'topLeft',
  topRight = 'topRight',
  bottomLeft = 'bottomLeft',
  bottomRight = 'bottomRight',
}

export enum BorderName {
  all = '전체',

  top = '위',
  bottom = '아래',
  left = '왼쪽',
  right = '오른쪽',

  topLeft = '왼쪽 위',
  topRight = '오른쪽 위',
  bottomLeft = '왼쪽 아래',
  bottomRight = '오른쪽 아래',
}
