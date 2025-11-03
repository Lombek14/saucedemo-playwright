# saucedemo-playwright
[![Playwright Tests](https://github.com/Lombek14/saucedemo-playwright/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Lombek14/saucedemo-playwright/actions/workflows/ci.yml)

Cross-browser Playwright tests for the **SauceDemo** site, including UI smoke/regression and lightweight API checks.  
CI runs on every push/PR (smoke) and nightly (full regression), with sharding + uploaded artifacts (HTML report & traces).

---

## Quick start (local)

```bash
# 1) install deps
npm ci

# 2) install browsers (first time only)
npx playwright install --with-deps

# 3) run everything (all browsers)
npx playwright test

# 4) open the last HTML report
npx playwright show-report
