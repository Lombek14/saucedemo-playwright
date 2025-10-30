import { test, expect } from './fixtures';
import { getUsers } from './client';

test('@smoke GET /users returns 200 and a list', async ({ api }) => {
  const res = await getUsers(api, 1);
  expect(res.status(), `Unexpected ${res.status()} for ${res.url()}`).toBe(200);

  const body = await res.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});
