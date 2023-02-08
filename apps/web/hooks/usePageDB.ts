import { IDBPDatabase, openDB } from 'idb';
import type {} from 'node_modules/@types/react';

import { useEffect, useRef, useState } from 'react';

import { TemplateCreateDBKeys, TransactionType } from '@models/index';

export const getTaskHistories = async (db: IDBPDatabase) => {
  const tasksTransaction = (db as IDBPDatabase).transaction(
    TemplateCreateDBKeys.tasks,
    TransactionType.readonly
  );

  const res = await tasksTransaction.store.getAll();

  return res;
};

const openTaskQueueStore = async () => {
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
};

export const usePageDB = () => {
  const pageDB = useRef<IDBPDatabase | null>(null);
  const [pageDBMessage, setPageDBMessage] = useState<string | null>(null);

  useEffect(() => {
    if (pageDB.current !== null) {
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

  return {
    pageDB,
    pageDBMessage,
    setPageDBMessage,
  };
};
