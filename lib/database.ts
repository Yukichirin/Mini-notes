import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('tasks.db');

// Updated to match the 4 fields from the video
export type Note = {
  id: number;
  title: string;
  description: string;
  status: string;
};

export const initDatabase = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL
      );
    `);
  } catch (error) {
    console.error("Failed to initialize database", error);
  }
};

export const addNote = (title: string, description: string, status: string) => {
  try {
    db.runSync('INSERT INTO notes (title, description, status) VALUES (?, ?, ?)', [title, description, status]);
  } catch (error) {
    console.error("Error adding task", error);
    throw error;
  }
};

export const getNotes = (): Note[] => {
  try {
    return db.getAllSync<Note>('SELECT * FROM notes ORDER BY id DESC');
  } catch (error) {
    console.error("Error fetching tasks", error);
    return [];
  }
};

export const deleteNote = (id: number) => {
  try {
    db.runSync('DELETE FROM notes WHERE id = ?', [id]);
  } catch (error) {
    console.error("Error deleting task", error);
  }
};

export const updateNote = (id: number, title: string, description: string, status: string) => {
  try {
    db.runSync(
      'UPDATE notes SET title = ?, description = ?, status = ? WHERE id = ?', 
      [title, description, status, id]
    );
  } catch (error) {
    console.error("Error updating note", error);
    throw error;
  }
};