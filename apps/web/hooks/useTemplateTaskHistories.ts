import { IDBPDatabase, IDBPObjectStore } from 'idb';
import type {} from 'node_modules/@types/react';

import { useEffect, useState } from 'react';

import { CursorDirection, TransactionType } from '@models/index';

import { Blocks, Groups } from 'ui';

import { useBlockGroupsAtom } from './useBlockGroupsAtom';
import { getTaskHistories, usePageDB } from './usePageDB';

export const KEY_TASKS = 'tasks';
export const KEY_GARBAGE_TASKS = 'taskGarbages';

type GarbageTasksDBStoreType = IDBPObjectStore<
  unknown,
  string[],
  typeof KEY_GARBAGE_TASKS,
  TransactionType.readwrite
>;

type TasksDBStoreType = IDBPObjectStore<
  unknown,
  string[],
  typeof KEY_TASKS,
  TransactionType.readwrite
>;

type TaskType = 'create' | 'update' | 'delete';

export interface TaskHistoryInterface {
  taskType: TaskType;
  before: Blocks | Groups | null;
  after: Blocks | Groups | null;
}

const initializeGarbageTasks = async (store: GarbageTasksDBStoreType) => {
  store.clear();
};

const pushTaskHistories = async (db: IDBPDatabase, task: TaskHistoryInterface) => {
  const tasksTransaction = (db as IDBPDatabase).transaction(
    [KEY_TASKS, KEY_GARBAGE_TASKS],
    TransactionType.readwrite
  );

  const tasksStore = tasksTransaction.objectStore(KEY_TASKS);
  const garbageTasksStore = tasksTransaction.objectStore(KEY_GARBAGE_TASKS);

  await Promise.all([
    tasksStore.add(task),
    initializeGarbageTasks(garbageTasksStore),
    tasksTransaction.done,
  ]);
};

const getAllTasks = async (db: IDBPDatabase) => {
  const transaction = db.transaction(KEY_TASKS, TransactionType.readonly);

  const res = await transaction.store.getAll();

  return res;
};

const pushGarbageTaskHistories = (store: GarbageTasksDBStoreType, value: TaskHistoryInterface) => {
  const key = store.add(value);

  return { key, value };
};

const deleteTaskHistories = (store: TasksDBStoreType, tasksKey: IDBValidKey) => {
  store.delete(IDBKeyRange.only(tasksKey));
};

const deleteGarbageTaskHistories = (
  store: GarbageTasksDBStoreType,
  garbageTasksKey: IDBValidKey
) => {
  store.delete(IDBKeyRange.only(garbageTasksKey));
};

const popTaskHistories = async (db: IDBPDatabase) => {
  const tasksTransaction = (db as IDBPDatabase).transaction(
    [KEY_TASKS, KEY_GARBAGE_TASKS],
    TransactionType.readwrite
  );

  const tasksStore = tasksTransaction.objectStore(KEY_TASKS);
  const garbageTasksStore = tasksTransaction.objectStore(KEY_GARBAGE_TASKS);

  const lastTask = await tasksStore.openCursor(null, CursorDirection.prevunique);
  if (lastTask === null) return null;

  await Promise.all([
    deleteTaskHistories(tasksStore, lastTask.key),
    pushGarbageTaskHistories(garbageTasksStore, lastTask.value),
    tasksTransaction.done,
  ]);

  return { key: lastTask.key, value: lastTask.value };
};

const restoreTaskHistories = async (
  db: IDBPDatabase
): Promise<{ key: IDBValidKey; value: TaskHistoryInterface } | null> => {
  const tasksTransaction = (db as IDBPDatabase).transaction(
    [KEY_TASKS, KEY_GARBAGE_TASKS],
    TransactionType.readwrite
  );

  const tasksStore = tasksTransaction.objectStore(KEY_TASKS);
  const garbageTasksStore = tasksTransaction.objectStore(KEY_GARBAGE_TASKS);

  const lastGarbageTask = await garbageTasksStore.openCursor(null, CursorDirection.prevunique);
  if (lastGarbageTask === null) return null;

  await Promise.all([
    deleteGarbageTaskHistories(garbageTasksStore, lastGarbageTask.key),
    tasksStore.add(lastGarbageTask.value),
    tasksTransaction.done,
  ]);

  return { key: lastGarbageTask.key, value: lastGarbageTask.value };
};

export const useTemplateTaskHistories = () => {
  const { pageDB, pageDBMessage } = usePageDB();
  const [tasks, setTasks] = useState<TaskHistoryInterface[] | null>(null);
  const [isTaskInitialized, setIsTaskInitialized] = useState(false);
  const { addBlock, addGroup, updateBlock, updateGroup, deleteBlock, deleteGroup } =
    useBlockGroupsAtom();

  useEffect(() => {
    if (pageDB.current !== null) {
      (async () => {
        const taskHistories = await getTaskHistories(pageDB.current as IDBPDatabase);

        setTasks(() => taskHistories ?? []);
        setIsTaskInitialized(() => true);
      })();

      return;
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [pageDB.current]);

  useEffect(() => {
    if (!isTaskInitialized || !tasks?.length) return;

    const reflectTasksIntoBlockGroupStore = () => {
      tasks.forEach((task) => {
        const afterTask = task.after;
        const beforeTask = task.before;

        /**
         * 삭제하는 로직
         */
        if (afterTask === null) {
          if (beforeTask === null) return;

          if (beforeTask.type === 'block') {
            deleteBlock(beforeTask);
          } else {
            deleteGroup(beforeTask);
          }
          return;
        }

        if (afterTask.type === 'block') {
          if (task.taskType === 'create') {
            addBlock(afterTask);
          } else if (task.taskType === 'update') {
            updateBlock(afterTask);
          }
        } else {
          if (task.taskType === 'create') {
            addGroup(afterTask);
          } else if (task.taskType === 'update') {
            updateGroup(afterTask);
          }
        }
      });
    };

    reflectTasksIntoBlockGroupStore();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTaskInitialized, tasks]);

  const addTask = async (task: TaskHistoryInterface) => {
    if (pageDB.current === null) return;

    await pushTaskHistories(pageDB.current, task);
    setTasks((state) => [...(state ?? []), task]);
  };

  const getTasksNotUpdatedInWAS = async () => {
    if (pageDB.current === null) return;

    const res = await getAllTasks(pageDB.current);
    return res;
  };

  const cancelTask = async () => {
    if (pageDB.current === null) return;

    const res = await popTaskHistories(pageDB.current);
    if (res === null) return;

    setTasks((state) => {
      const nextState = [...(state ?? [])];
      nextState.pop();

      return nextState;
    });
  };

  const restoreTask = async () => {
    if (pageDB.current === null) {
      return;
    }

    const res = await restoreTaskHistories(pageDB.current);
    if (res === null) return;

    setTasks((state) => [...(state ?? []), res.value]);
  };

  return {
    KEY_TASKS,
    KEY_GARBAGE_TASKS,

    pageDB,
    pageDBMessage,
    tasks,

    addTask,
    cancelTask,
    restoreTask,

    getTasksNotUpdatedInWAS,
  };
};
