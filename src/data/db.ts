/**
 * IndexedDB wrapper for the User Management application
 * Handles database initialization and provides transaction support
 */

const DB_NAME = 'UserManagementDB';
const DB_VERSION = 1;
const USERS_STORE = 'users';

let dbInstance: IDBDatabase | null = null;

/**
 * Initialize the IndexedDB database
 * Creates the 'users' object store with 'id' as the key path
 */
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error('Failed to open database'));
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create users object store if it doesn't exist
      if (!db.objectStoreNames.contains(USERS_STORE)) {
        db.createObjectStore(USERS_STORE, { keyPath: 'id' });
      }
    };
  });
};

export const executeTransaction = <T>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> => {
  return new Promise((resolve, reject) => {
    initDB()
      .then((db) => {
        const transaction = db.transaction(USERS_STORE, mode);
        const store = transaction.objectStore(USERS_STORE);
        const request = operation(store);

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          reject(request.error);
        };

        transaction.onerror = () => {
          reject(transaction.error);
        };
      })
      .catch(reject);
  });
};
