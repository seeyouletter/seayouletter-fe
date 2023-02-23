import { IDBPDatabase, openDB } from 'idb';
import type {} from 'node_modules/@types/react';

import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { templateTasksDBAtom } from '@atoms/templateTasksDBAtom';

import { TaskHistoryInterface, TemplateCreateDBKeys, TransactionType } from '@models/index';

import { useBlockGroupsAtom } from './useBlockGroupsAtom';

const openTaskQueueStore = async () => {
  try {
    const pageDB = await openDB('pageId', 1, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore(TemplateCreateDBKeys.tasks, { keyPath: 'id', autoIncrement: true });
          db.createObjectStore(TemplateCreateDBKeys.taskGarbages, {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
      },
    });

    return { db: pageDB, message: null };
  } catch (e) {
    return { db: null, message: 'failed to fetch pageDB.' };
  }
};

export const useTemplateTasksInit = () => {
  const [dbState, setDBState] = useAtom(templateTasksDBAtom);
  const {
    addBlock,
    addGroup,
    updateBlock,
    updateGroup,
    deleteBlock,
    deleteGroup,
    blockGroupState,
  } = useBlockGroupsAtom();

  /**
   * @todo
   * 추후 해당 제네릭이 무엇을 의미하는지에 대해 알아야 한다.
   * @see: https://github.com/seeyouletter/seeyouletter-fe/pull/69
   */
  const getTaskHistories = async (db: IDBPDatabase | null) => {
    if (!db) return null;

    try {
      const tasksTransaction = db.transaction(TemplateCreateDBKeys.tasks, TransactionType.readonly);

      const res: TaskHistoryInterface[] = await tasksTransaction.store.getAll();

      return res;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const reflectTasksIntoBlockGroupStore = (tasks: TaskHistoryInterface[]) => {
      if (!tasks) return;
      const nowBlocksStore = blockGroupState.blocksStore;
      const nowGroupsStore = blockGroupState.groupsStore;

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

        if (afterTask.type === 'block') {
          nowBlocksStore[afterTask.id] = afterTask;
        } else {
          nowGroupsStore[afterTask.id] = afterTask;
        }
      });
    };

    const fetchTasksDB = async () => {
      if (dbState.db) return;

      const { db, message } = await openTaskQueueStore();
      const tasks = await getTaskHistories(db);

      setDBState((state) => ({
        ...state,
        db,
        tasks,
        message,
        dbMounted: true,
      }));

      if (tasks) {
        reflectTasksIntoBlockGroupStore(tasks);
      }
    };

    fetchTasksDB();

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return {
    dbState,
    setDBState,
  };
};
