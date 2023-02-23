import { type IDBPDatabase } from 'idb';

import { atom } from 'jotai';

import { TaskHistoryInterface } from '@models/index';

export interface TemplateCreatePageDBAtomInterface {
  pageId: string;
  db: IDBPDatabase | null;
  tasks: TaskHistoryInterface[] | null;
  message: string | null;
  dbMounted: boolean;
}

export const templateTasksDBAtom = atom<TemplateCreatePageDBAtomInterface>({
  /**
   * @todo
   * TODO: 추후 페이지에 대한 id가 필요합니다. 이유는 사용자가 페이지를 여러 개 생성할 수 있고, 이에 따라 임시저장되는 곳에서의 tasks를 저장해야 하기 때문입니다.
   * 나아가, 이를 통해 페이지의 url을 바꿔줄 수 있도록 한다면 UX가 더 좋아질 것 같습니다.
   */
  pageId: 'pageId',
  db: null,
  tasks: null,
  message: null,
  dbMounted: false,
});
