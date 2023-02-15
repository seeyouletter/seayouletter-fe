import { BlockGroupPriorities, Blocks } from 'ui';

export interface UseLeafParams<T = Blocks> extends BlockGroupPriorities {
  data: T;
}
