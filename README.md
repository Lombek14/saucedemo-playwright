# saucedemo-playwright
## Test Strategy

### Why Playwright
- **Cross-browser + device**: single test API runs on Chromium, Firefox, WebKit (desktop/mobile).
- **Fast + reliable**: auto-wait, locator assertions, parallel workers, retries, sharding.
- **Great DX**: trace viewer, codegen, UI Mode, rich reporters.
- **First-class API testing**: built-in `request` fixtures for API/contract checks.

---

### Test Types & Tags
- `@smoke` — critical paths that must pass on every commit (fast, < 2–3 min).
- `@regression` — fuller coverage, runs on PR + nightly.
- (Optional) `@a11y` — lightweight accessibility smoke.

**Run locally**
```bash
# all tests in all browsers
npx playwright test

# smoke only (all browsers)
npx playwright test --grep @smoke

# regression only in Chromium, headed, with UI Mode
npx playwright test --grep @regression --project=Chromium --headed --ui

# open last HTML report
npx playwright show-report


Cross-browser Playwright tests for SauceDemo.

[![Playwright Tests](https://github.com/Lombek14/saucedemo-playwright/actions/workflows/ci.yml/badge.svg)](https://github.com/Lombek14/saucedemo-playwright/actions/workflows/ci.yml)

## Run locally
```bash
npm ci
npx playwright install --with-deps
npm test
npm run report

