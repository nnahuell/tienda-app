import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('app.db');

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS test (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value TEXT NOT NULL
      );`
    );
  });
};

export const insertTest = (text) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO test (value) VALUES (?);', [text]);
  });
};

export const getAllTests = (cb) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM test;', [], (_, { rows }) => cb(rows._array));
  });
};
