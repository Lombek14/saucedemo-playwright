import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'testdb.sqlite');

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT,
    first_name TEXT,
    last_name TEXT
  );
`);

db.prepare(
  `INSERT OR IGNORE INTO users (id, email, first_name, last_name) VALUES (?, ?, ?, ?)`
).run(2, 'janet.weaver@reqres.in', 'Janet', 'Weaver');

db.close();
console.log('✅ db/testdb.sqlite created and seeded');
