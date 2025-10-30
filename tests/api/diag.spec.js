// tests/api/diag.spec.js
import { test, expect, request } from '@playwright/test';

test('diag jsonplaceholder /users', async () => {
  // Hard-disable any proxy the current shell might be exporting
  for (const k of ['HTTP_PROXY','HTTPS_PROXY','ALL_PROXY','http_proxy','https_proxy','all_proxy','NO_PROXY','no_proxy']) {
    delete process.env[k];
  }

  const ctx = await request.newContext({
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: { Accept: 'application/json' },
    ignoreHTTPSErrors: true,
  });

  const res = await ctx.get('/users');
  const text = await res.text();

  console.log('URL:', res.url(), 'STATUS:', res.status(), res.statusText());
  console.log('HEADERS:', Object.fromEntries(res.headersArray().map(h => [h.name, h.value])));
  console.log('BODY sample:', text.slice(0, 300));

  await ctx.dispose();

  expect(res.status(), 'should be HTTP 200').toBe(200);
});
