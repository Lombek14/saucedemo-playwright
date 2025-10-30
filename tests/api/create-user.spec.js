import { test, expect } from './fixtures';
import { createUser } from './client';

test('@regression POST /users echoes created resource', async ({ api }) => {
  const payload = { name: 'Mahoula', email: 'mah@example.com' };
  const res = await createUser(api, payload);
  expect(res.status()).toBe(201); // jsonplaceholder often returns 201

  const body = await res.json();
  // jsonplaceholder echoes + gives an id
  expect(body).toMatchObject(payload);
  expect(body.id).toBeTruthy();
});
