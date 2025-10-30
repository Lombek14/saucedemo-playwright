// tests/api/smoke-ping.spec.js
import { test, expect } from './fixtures';   // << uses the proxy-proof context we made

test('@smoke jsonplaceholder ping returns 200 and list', async ({ api }) => {
  const res = await api.get('/users');      // baseURL set in fixtures.js
  expect(res.status(), `Got ${res.status()} for ${res.url()}`).toBe(200);

  const body = await res.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});
