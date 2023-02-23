import { IDBPObjectStore } from 'idb';

import { BlockMemberType } from 'ui';

import { TransactionType } from '../IndexedDB';

export const KEY_TASKS = 'tasks';
export const KEY_GARBAGE_TASKS = 'taskGarbages';

export type GarbageTasksDBStoreType = IDBPObjectStore<
  unknown,
  string[],
  typeof KEY_GARBAGE_TASKS,
  TransactionType.readwrite
>;

export type TasksDBStoreType = IDBPObjectStore<
  unknown,
  string[],
  typeof KEY_TASKS,
  TransactionType.readwrite
>;

export type TaskType = 'create' | 'update' | 'delete';

export interface TaskHistoryInterface {
  taskType: TaskType;
  before: BlockMemberType | null;
  after: BlockMemberType | null;
}
