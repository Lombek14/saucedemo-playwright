import Database from 'better-sqlite3';
import path from 'path';

// Path to SQLite DB file inside db/ folder
const dbPath = path.join(process.cwd(), 'db', 'testdb.sqlite');

// Function to connect to database
export function getDb() {
  return new Database(dbPath);
}

// Query: find user by email
export function findUserByEmail(email) {
  const db = getDb();
  const stmt = db.prepare(
    'SELECT id, email, first_name, last_name FROM users WHERE email = ?'
  );
  const row = stmt.get(email);  // returns 1 row or undefined
  db.close();
  return row;
}

export function getAllProducts() {
  const db = getDb();
  const stmt = db.prepare('SELECT id, name, price FROM products ORDER BY id;');
  const rows = stmt.all(); // get ALL rows
  db.close();
  return rows;
}

