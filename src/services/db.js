import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';
const dbPromise = !isWeb ? SQLite.openDatabaseAsync('app.db') : null;

export const initDB = async () => {
  if (isWeb) return;
  const db = await dbPromise;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS test (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      value TEXT NOT NULL
    );
  `);
};

export const insertTest = async (text) => {
  if (isWeb) return;
  const db = await dbPromise;
  await db.runAsync('INSERT INTO test (value) VALUES (?);', [text]);
};

export const getAllTests = async (cb) => {
  if (isWeb) { cb?.([]); return []; }
  const db = await dbPromise;
  const rows = await db.getAllAsync('SELECT * FROM test;');
  cb?.(rows);
  return rows;
};

// BORRAR TODAS LAS FILAS (mantiene la tabla)
export const clearTests = async () => {
  if (isWeb) return;
  const db = await dbPromise;
  await db.runAsync('DELETE FROM test;');
};

// REINICIAR TABLA (drop + create)
export const resetTestTable = async () => {
  if (isWeb) return;
  const db = await dbPromise;
  await db.execAsync('DROP TABLE IF EXISTS test;');
  await initDB();
};

// contar filas rápido
export const getCount = async () => {
  if (isWeb) return 0;
  const db = await dbPromise;
  const row = await db.getFirstAsync?.('SELECT COUNT(*) AS c FROM test;');
  return row?.c ?? (await getAllTests()).length;
};
