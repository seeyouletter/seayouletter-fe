import { IDBPObjectStore } from 'idb';

import { BlockMemberType } from 'ui';

import { TemplateCreateDBKeys, TransactionType } from '../IndexedDB';

export type GarbageTasksDBStoreType = IDBPObjectStore<
  unknown,
  TemplateCreateDBKeys[],
  TemplateCreateDBKeys.taskGarbages,
  TransactionType.readwrite
>;

export type TasksDBStoreType = IDBPObjectStore<
  unknown,
  TemplateCreateDBKeys[],
  TemplateCreateDBKeys.tasks,
  TransactionType.readwrite
>;

export type TaskType = 'create' | 'update' | 'delete';

export interface TaskHistoryInterface {
  taskType: TaskType;
  before: BlockMemberType | null;
  after: BlockMemberType | null;
}
