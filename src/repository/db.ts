import * as SQLite from 'expo-sqlite';

const DB_NAME = 'test_db';

let db: SQLite.SQLiteDatabase | null = null;

export const getDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync(DB_NAME);
  }
  return db;
};
