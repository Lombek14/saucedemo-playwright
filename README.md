# Playwright Tests

This repository contains automated end-to-end tests using [Playwright](https://playwright.dev).

It includes:

- 🌐 UI tests for Saucedemo (login, add to cart, checkout)
- 🧩 Page Object Model for cleaner test code (in `pages/`)
- 🤝 Hybrid API + UI tests for **Mahovastore** using a shared `apiUser` fixture
- 🔌 Simple CRUD API tests (GET/POST/PUT/DELETE) against Reqres in `tests/simpleCrudApi.spec.js`


## 🚀 Run Tests Locally

```bash
npm install
npx playwright install
npm run test
```

🧪 **CI Integration**

Tests run automatically on GitHub Actions using the workflow in  
`.github/workflows/playwright.yml`.

You can view detailed HTML reports in the workflow artifacts after each run.


## 📁 Project Structure

```text
📁 saucedemo-playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI workflow
│
├── fixtures/
│   ├── authenticatedPage.js        # Reusable login/session fixture
│   └── hybridTest.js               # apiUser fixture + Mahovastore hybrid setup
│
├── pages/                          # Page Object Model layer
│   ├── CheckoutPage.js
│   ├── InventoryPage.js
│   └── LoginPage.js
│
├── test-data/
│   └── customerData.json           # Sample customer data for checkout tests
│
├── tests/
│   ├── add-to-cart.spec.js         # Saucedemo add-to-cart UI tests
│   ├── checkout.spec.js            # Saucedemo checkout flow tests
│   ├── login.spec.js               # Saucedemo login tests
│   ├── mahovastore-hybrid.spec.js  # Hybrid API + UI tests using apiUser fixture
│   └── simpleCrudApi.spec.js       # Simple CRUD API tests (GET/POST/PUT/DELETE)
│
├── playwright-report/              # HTML reports (generated)
├── test-results/                   # Raw Playwright artifacts (videos, traces, etc.)
│
├── playwright.config.js            # Playwright configuration
├── package.json
├── package-lock.json
└── README.md
```

## 📌 Commands

| Command                      | Description                                  |
| --------------------------- | -------------------------------------------- |
| `npm run test`              | Run tests locally                            |
| `npm run test:ci`           | Run tests in CI mode (line + HTML reporters) |
| `npm run pw:install`        | Install browsers and dependencies            |
| `npx playwright show-report`| Open the last HTML report                    |


## ✅ Notes

**CI**
- Runs automatically on each push and pull request via GitHub Actions.

**Authentication**
- Uses helper-based login via `fixtures/authenticatedPage.js`.

**Page Objects**
- UI flows modeled with:  
  `LoginPage`, `InventoryPage`, `CheckoutPage`.

**Hybrid API + UI**
- Implemented in `fixtures/hybridTest.js` using `apiUser` fixture (Reqres API).  
- Used by `tests/mahovastore-hybrid.spec.js` to:
  - Drive Mahovastore search  
  - Validate cart + checkout subtotal  
  - Fill checkout contact/delivery info from API data  
  - Perform a UI → API round-trip:
    Email pulled from checkout → POST to Reqres → assert returned `id`

**API-only tests**
- `tests/simpleCrudApi.spec.js` includes GET, POST, PUT, DELETE examples using Reqres.  
  Great demonstration of API fundamentals inside Playwright.

