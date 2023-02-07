import { IDBPDatabase, openDB } from 'idb';
import type {} from 'node_modules/@types/react';

import { useEffect, useRef, useState } from 'react';

const openTaskQueueStore = async () => {
  const pageDB = await openDB('pageId', 1, {
    upgrade(db, oldVersion) {
      if (oldVersion < 1) {
        db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
        db.createObjectStore('taskGarbages', { keyPath: 'id', autoIncrement: true });
      }
    },
  });

  return { db: pageDB, message: null };
};

export const useTemplateTaskQueue = () => {
  const pageDB = useRef<IDBPDatabase | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (pageDB.current) {
      return;
    }

    (async () => {
      try {
        const { db, message } = await openTaskQueueStore();
        pageDB.current = db;
        setMessage(() => message);
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error(e);
      }
    })();
  }, []);

  return {
    pageDB,
    message,
  };
};
