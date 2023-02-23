import { IDBPDatabase } from 'idb';

import { useAtom } from 'jotai';

import { templateTasksDBAtom } from '@atoms/index';

import {
  CursorDirection,
  GarbageTasksDBStoreType,
  TaskHistoryInterface,
  TasksDBStoreType,
  TemplateCreateDBKeys,
  TransactionType,
} from '@models/index';

const initializeGarbageTasks = async (store: GarbageTasksDBStoreType) => {
  store.clear();
};

const pushTaskHistories = async (db: IDBPDatabase, task: TaskHistoryInterface) => {
  const tasksTransaction = (db as IDBPDatabase).transaction(
    [TemplateCreateDBKeys.tasks, TemplateCreateDBKeys.taskGarbages],
    TransactionType.readwrite
  );

  const tasksStore = tasksTransaction.objectStore(TemplateCreateDBKeys.tasks);
  const garbageTasksStore = tasksTransaction.objectStore(TemplateCreateDBKeys.taskGarbages);

  await Promise.all([
    tasksStore.add(task),
    initializeGarbageTasks(garbageTasksStore),
    tasksTransaction.done,
  ]);
};

const getAllTasks = async (db: IDBPDatabase) => {
  const transaction = db.transaction(TemplateCreateDBKeys.tasks, TransactionType.readonly);

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
  const tasksTransaction = db.transaction(
    [TemplateCreateDBKeys.tasks, TemplateCreateDBKeys.taskGarbages],
    TransactionType.readwrite
  );

  const tasksStore = tasksTransaction.objectStore(TemplateCreateDBKeys.tasks);
  const garbageTasksStore = tasksTransaction.objectStore(TemplateCreateDBKeys.taskGarbages);

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
  const tasksTransaction = db.transaction(
    [TemplateCreateDBKeys.tasks, TemplateCreateDBKeys.taskGarbages],
    TransactionType.readwrite
  );

  const tasksStore = tasksTransaction.objectStore(TemplateCreateDBKeys.tasks);
  const garbageTasksStore = tasksTransaction.objectStore(TemplateCreateDBKeys.taskGarbages);

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
  const [dbState, setDBState] = useAtom(templateTasksDBAtom);

  const addTask = async (task: TaskHistoryInterface) => {
    if (dbState.db === null) return;

    await pushTaskHistories(dbState.db, task);
    setDBState((state) => {
      return {
        ...state,
        tasks: [...(state.tasks ?? []), task],
      };
    });
  };

  const getTasksNotUpdatedInWAS = async () => {
    if (dbState.db === null) return;

    const res = await getAllTasks(dbState.db);
    return res;
  };

  const cancelTask = async () => {
    if (dbState.db === null) return;

    const res = await popTaskHistories(dbState.db);
    if (res === null) return;

    setDBState((state) => {
      const nextState = [...(state.tasks ?? [])];
      nextState.pop();

      return {
        ...state,
        tasks: nextState,
      };
    });
  };

  const restoreTask = async () => {
    if (dbState.db === null) {
      return;
    }

    const res = await restoreTaskHistories(dbState.db);
    if (res === null) return;

    setDBState((state) => {
      return {
        ...state,
        tasks: [...(state.tasks ?? []), res.value],
      };
    });
  };

  return {
    dbState,

    addTask,
    cancelTask,
    restoreTask,

    getTasksNotUpdatedInWAS,
  };
};
