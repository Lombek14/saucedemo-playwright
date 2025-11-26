import { test, expect } from '@playwright/test';
import { findUserByEmail } from '../db/dbClient.js';

test.describe('@api @db API + DB validation', () => {
  test('ReqRes user matches DB record', async ({ request }) => {
    
    // --- ReqRes API ---
    const response = await request.get('https://reqres.in/api/users/2');
    await expect(response).toBeOK();

    const body = await response.json();
    const apiUser = body.data; // { id, email, first_name, last_name, ... }

    console.log('API user:', apiUser);

    // --- Query SQLite DB ---
    const dbUser = findUserByEmail(apiUser.email);

    console.log('DB user:', dbUser);

    // --- Compare API vs DB ---
    expect(dbUser).toBeTruthy(); // row exists
    expect(dbUser.email).toBe(apiUser.email);
    expect(dbUser.first_name).toBe(apiUser.first_name);
    expect(dbUser.last_name).toBe(apiUser.last_name);
  });
});
