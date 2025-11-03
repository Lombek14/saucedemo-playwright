// tests/api/create-user.spec.js
import { test, expect } from '@playwright/test';

test('@regression POST /users echoes created resource', async ({ request }) => {
  const base = process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com';
  const newUser = { name: 'Mahoula', username: 'mahoula', email: 'm@demo.test' };

  const res = await request.post(`${base}/users`, { data: newUser });
  // jsonplaceholder returns 201 for POST
  expect(res.status(), `Unexpected ${res.status()} for ${res.url()}`).toBe(201);

  const body = await res.json();
  expect(body).toMatchObject(newUser);
  expect(body).toHaveProperty('id');
});
