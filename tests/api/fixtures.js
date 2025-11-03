// tests/api/fixtures.js
import { test as base, request } from '@playwright/test';

export const test = base.extend({
  api: async ({}, use) => {
    // hard-disable any proxy/env interference
    for (const k of [
      'HTTP_PROXY','HTTPS_PROXY','ALL_PROXY','NO_PROXY',
      'http_proxy','https_proxy','all_proxy','no_proxy'
    ]) delete process.env[k];

    const ctx = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: { Accept: 'application/json' },
      ignoreHTTPSErrors: true,
    });

    await use(ctx);
    await ctx.dispose();
  },
});

export const expect = test.expect;
