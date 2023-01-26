import { BlockInterface, BlockStyles, GroupInterface } from 'ui';

/**
 * @todo
 * @description
 * 현재 작업하다가 남은 타입인데, 혹여나 백엔드의 응답이 BlockInterface와 같으면 삭제한다.
 * 이는 밑의 인터페이스 역시 마찬가지다.
 *
 * 다만 아직 백엔드 응답 명세가 나오질 않아 나오면 바로 작업하기 편하게 남겨두도록 한다.
 */
export interface BlockResponseInterface extends BlockInterface {
  style: BlockStyles;
}

export interface GroupResponseInterface extends GroupInterface {
  blocks: (BlockResponseInterface | GroupResponseInterface)[];
}

export interface GroupStoreValueInterface extends Omit<GroupInterface, 'blocks'> {
  blocks: string[];
}
