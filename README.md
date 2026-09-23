# OrangeHRM QA Automation Project

End-to-end QA project covering UI automation, manual testing, API automation and a
CI pipeline, built against the OrangeHRM open-source demo:

- UI under test: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
- API under test: https://jsonplaceholder.typicode.com/users

## Repo structure

```
orangehrm-qa-project/
├── ui-automation/       # Playwright + TypeScript, Page Object Model
├── manual-tests/        # manual test case sheet + bug report
├── api-automation/      # Postman collection, runnable via Newman
├── .github/workflows/   # CI pipeline that runs the UI + API suites together
└── README.md            # this file
```

## Tech stack

- **UI automation**: Playwright + TypeScript, Page Object Model
- **API automation**: Postman collection, run via Newman
- **Reports**: Playwright HTML report + Allure (UI), Newman HTML report (API)
- **CI**: GitHub Actions

## Quick start

Each sub-folder has its own README with full setup/run instructions. Short version:

```bash
# UI suite
cd ui-automation
npm install
npx playwright install --with-deps
npm test                      # all scenarios, one suite
npm run report                # opens the Allure report

# API suite
cd ../api-automation
npm install
npm test                      # runs the Postman collection via Newman
```

### Running everything together (matches CI)

```bash
cd ui-automation && npm ci && npx playwright install --with-deps && npm test
cd ../api-automation && npm ci && npm test
```

Both suites also run individually — each Playwright spec file and the Postman
collection can be executed on its own (see the sub-folder READMEs) — and together
in one CI run, see `.github/workflows/ci.yml`.

## Reports

- UI: Playwright generates an HTML report and Allure results on every run
  (`ui-automation/playwright-report/`, `ui-automation/allure-report/`).
- API: Newman generates an HTML report on every run
  (`api-automation/newman-report/`).

Both report folders are git-ignored (generated artifacts) and regenerate on every
`npm test` — see each sub-folder's README for how to open them.
