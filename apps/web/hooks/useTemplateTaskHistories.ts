import { IDBPDatabase, IDBPObjectStore, openDB } from 'idb';
import type {} from 'node_modules/@types/react';

import { useEffect, useRef, useState } from 'react';

import { CursorDirection, TransactionType } from '@models/index';

import { Blocks, Groups } from 'ui';

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

const openTaskQueueStore = async () => {
  const pageDB = await openDB('pageId', 1, {
    upgrade(db, oldVersion) {
      if (oldVersion < 1) {
        db.createObjectStore(KEY_TASKS, { keyPath: 'id', autoIncrement: true });
        db.createObjectStore(KEY_GARBAGE_TASKS, { keyPath: 'id', autoIncrement: true });
      }
    },
  });

  return { db: pageDB, message: null };
};

const getTaskHistories = async (db: IDBPDatabase) => {
  const tasksTransaction = (db as IDBPDatabase).transaction(KEY_TASKS, TransactionType.readonly);

  const res = await tasksTransaction.store.getAll();

  return res;
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

const restoreTaskHistories = async (db: IDBPDatabase) => {
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
  const pageDB = useRef<IDBPDatabase | null>(null);

  const [tasks, setTasks] = useState<TaskHistoryInterface[] | null>(null);
  const [pageDBMessage, setPageDBMessage] = useState<string | null>(null);

  useEffect(() => {
    if (pageDB.current !== null) {
      (async () => {
        const taskHistories = await getTaskHistories(pageDB.current as IDBPDatabase);

        setTasks(() => taskHistories ?? []);
      })();

      return;
    }

    (async () => {
      try {
        const { db, message } = await openTaskQueueStore();

        pageDB.current = db;
        setPageDBMessage(() => message);
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error(e);
      }
    })();

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [pageDB.current]);

  const addTask = async (task: TaskHistoryInterface) => {
    if (pageDB.current === null) return;

    await pushTaskHistories(pageDB.current, task);
    setTasks((state) => [...(state ?? []), task]);
  };

  // [x] 병렬로 처리하여 성능 개선
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
  };
};
