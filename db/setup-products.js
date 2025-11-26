import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db', 'testdb.sqlite');
const db = new Database(dbPath);

// 1) Create products table
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL
  );
`);

// 2) Insert 20 demo products
const insert = db.prepare(`
  INSERT OR REPLACE INTO products (id, name, price)
  VALUES (@id, @name, @price);
`);

const products = [];

for (let i = 1; i <= 20; i++) {
  products.push({
    id: i,
    name: `Product ${i}`,
    price: Number((10 + i * 0.5).toFixed(2)),
  });
}

for (const p of products) {
  insert.run(p);
}

db.close();
console.log('Products table created and 20 products inserted.');
