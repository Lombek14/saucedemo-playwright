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
🧪 CI Integration

Tests run automatically on GitHub Actions using the workflow defined in
.github/workflows/playwright.yml.

You can view detailed HTML reports in the workflow artifacts after each run.
```
📁 Project Structure
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
├── playwright.config.js            # Playwright configuration (projects, reporters, etc.)
├── package.json
├── package-lock.json
└── README.md

```
| Command                      | Description                                  |
| ---------------------------- | -------------------------------------------- |
| `npm run test`               | Run tests locally                            |
| `npm run test:ci`            | Run tests in CI mode (line + HTML reporters) |
| `npm run pw:install`         | Install browsers and dependencies            |
| `npx playwright show-report` | Open the last HTML report                    |

```
✅ Notes

    ✅ CI status: Runs on each push and pull request via GitHub Actions

    🔐 Authentication: Uses helper-based login in tests/helpers/auth.js (via authenticatedPage fixture)

    🧱 Page Objects: UI flows are modeled with LoginPage, InventoryPage, and CheckoutPage

    🌉 Hybrid API + UI:

        Defined in fixtures/hybridTest.js using an apiUser fixture that calls Reqres (https://reqres.in/api/users/2)

        tests/mahovastore-hybrid.spec.js uses apiUser to:

            • Drive Mahovastore search  
            • Validate cart + checkout subtotal  
            • Fill checkout contact/delivery info from API data  
            • Perform a UI → API round-trip (email from checkout → POST to Reqres → assert id)

🌐 API-only tests:

    tests/simpleCrudApi.spec.js contains Simple CRUD examples (GET, POST, PUT, DELETE)  
    against Reqres, useful to demonstrate API testing fundamentals in Playwright.


