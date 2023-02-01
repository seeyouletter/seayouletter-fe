import { GroupInterface } from 'ui';

export interface GroupStoreValueInterface extends Omit<GroupInterface, 'blocks'> {
  blocks: string[];
}
