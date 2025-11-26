import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db', 'testdb.sqlite');

// Open (or create) the SQLite DB file
const db = new Database(dbPath);

// 1) Create users table if it doesn't exist yet
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT
  );
`);

// 2) Insert Janet from ReqRes
const user = {
  id: 2,
  email: 'janet.weaver@reqres.in',
  first_name: 'Janet',
  last_name: 'Weaver',
};

const stmt = db.prepare(`
  INSERT OR REPLACE INTO users (id, email, first_name, last_name)
  VALUES (@id, @email, @first_name, @last_name);
`);

stmt.run(user);

db.close();

console.log('DB setup done. users table created and Janet inserted.');
