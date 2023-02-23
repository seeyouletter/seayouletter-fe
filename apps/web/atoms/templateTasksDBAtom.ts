import { type IDBPDatabase } from 'idb';

import { atom } from 'jotai';

import { TaskHistoryInterface } from '@models/task-histories';

export interface TemplateCreatePageDBAtomInterface {
  pageId: string;
  db: IDBPDatabase | null;
  tasks: TaskHistoryInterface[] | null;
  message: string | null;
  dbMounted: boolean;
}

export const templateTasksDBAtom = atom<TemplateCreatePageDBAtomInterface>({
  pageId: 'pageId',
  db: null,
  tasks: null,
  message: null,
  dbMounted: false,
});
