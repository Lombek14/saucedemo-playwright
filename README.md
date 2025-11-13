# Playwright Tests

This repository contains automated end-to-end tests using [Playwright](https://playwright.dev).

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
├── tests/
│   ├── helpers/
│   │   └── auth.js
│   ├── login.spec.js
│   ├── add-to-cart.spec.js
│   └── checkout.spec.js
├── playwright.config.js
├── package.json
└── README.md
```
| Command                      | Description                                  |
| ---------------------------- | -------------------------------------------- |
| `npm run test`               | Run tests locally                            |
| `npm run test:ci`            | Run tests in CI mode (line + HTML reporters) |
| `npm run pw:install`         | Install browsers and dependencies            |
| `npx playwright show-report` | Open the last HTML report                    |

```
✅ CI status: Runs on each push and pull request
💡 Auth: Uses simple helper-based login (tests/helpers/auth.js)

