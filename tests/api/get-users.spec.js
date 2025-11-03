// tests/api/get-users.spec.js
import { test, expect } from './fixtures';
import { getUsers } from './client';

test.describe('@smoke GET /users', () => {
  test('@smoke GET /users returns 200 and a list', async ({ api }) => {
    // page=1 keeps the same signature even if your client ignores it
    const res = await getUsers(api, 1);

    // Helpful failure message shows status + URL
    expect
      .soft(res.status(), `Unexpected ${res.status()} for ${res.url()}`)
      .toBe(200);

    const body = await res.json();

    // jsonplaceholder returns an array at the root (reqres would be body.data)
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);

    // sanity-check a couple of fields from the first user
    const u = body[0];
    expect.soft(u).toHaveProperty('id');
    expect.soft(u).toHaveProperty('name');
    expect.soft(u).toHaveProperty('email');
  });
});
