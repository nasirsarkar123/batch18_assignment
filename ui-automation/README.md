# Part A — UI Automation (Playwright + TypeScript, POM)

Automates the four required scenarios against the OrangeHRM demo:
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

## Tech stack

- [Playwright Test](https://playwright.dev/) + TypeScript
- Page Object Model (`pages/`) — one class per screen/module
- Reporters: built-in Playwright HTML report **and** Allure (`allure-playwright`)

## Project layout

```
ui-automation/
├── pages/                  # Page Object classes
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── DashboardPage.ts     # left menu / logout, shared by every module
│   ├── PIMPage.ts
│   ├── AdminPage.ts
│   └── LeavePage.ts
├── tests/                  # one spec per scenario, each independent
│   ├── login.spec.ts               # Q1 — invalid login
│   ├── pim-add-employee.spec.ts    # Q2 — add employee + search + logout
│   ├── admin-edit-user.spec.ts     # Q3 — search/edit/persist a user
│   └── leave-apply-cancel.spec.ts  # Q4 — apply, verify, cancel
├── utils/dataGenerator.ts  # random name/date/username generator (no external deps)
└── playwright.config.ts
```

## Setup

```bash
npm install
npx playwright install --with-deps chromium
```

## Running the tests

Run everything, sequentially, as one suite (also what CI runs):

```bash
npm test
```

Run any single scenario on its own — every spec logs in and creates its own
data, so each is fully independent:

```bash
npm run test:login
npm run test:pim
npm run test:admin
npm run test:leave

# or directly:
npx playwright test tests/login.spec.ts
```

Run headed (watch the browser):

```bash
npm run test:headed
```

## Reports

Every `npm test` run regenerates both reports:

- **Playwright HTML report**: `npm run report:html` (opens `playwright-report/index.html`)
- **Allure report**: `npm run report` (builds `allure-report/` from `allure-results/` and opens it)

> Allure needs a local Java runtime to render the HTML report (the `allure`
> CLI is bundled via `allure-commandline`, but it shells out to `java`).
> If Java isn't available, the Playwright HTML report above is a full
> drop-in report with the same traces/screenshots/videos.

## Design notes

- **Independent + sequential**: `playwright.config.ts` runs with a single
  worker and `fullyParallel: false` so scenarios never race for shared
  state, but each spec file also logs in and builds its own test data from
  scratch, so it never depends on another spec having run first.
- **Q2 (PIM)** generates a random first/last name per run and verifies the
  new employee is searchable in the Employee List afterwards.
- **Q3 (Admin)** creates its own disposable user (random username) instead
  of editing a shared/admin account, so it's safe to re-run against the
  shared public demo without locking anyone out; it edits that user's
  status, saves, reloads the page, and re-searches to prove the change
  survived a refresh.
- **Q4 (Leave)** applies for a leave date a week out (so re-runs never
  collide with a previous run's request), asserts `Pending Approval`,
  cancels it, and asserts the status updates to `Cancelled`.
- Selectors prefer accessible roles/placeholders (`getByRole`,
  `getByPlaceholder`) over brittle CSS where the OrangeHRM demo's markup
  allows it, falling back to the `oxd-*` component classes elsewhere.
