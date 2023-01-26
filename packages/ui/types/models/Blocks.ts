import { IdType } from '@ui/block-group/types';

interface Block {
  type: 'block';
  parent: IdType;
  id: string;
  title: string;
  order: number;
}

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
  className: string;

  blockPosition: Position;

  bg: string;

  border: Record<Directions, Border>;
  borderRadius: Record<EdgeDirections, string>;
}

export type ObjectFit = 'cover' | 'contains' | 'fill' | 'none' | 'scale-down';

export interface ComponentSize {
  width: string;
  height: string;
}

export interface ImageBlock extends Block {
  subType: 'image';
  isEmbededImage: boolean;
  imageProperty: {
    opacity: number;
    objectFit: ObjectFit;
    position: {
      top: Position['top'];
      left: Position['left'];
    };
  };
}

export interface ShapeBlock extends Block {
  subType: 'shape';

  styles: BlockStyles;
}
