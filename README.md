# OrangeHRM QA Automation Project

End-to-end QA assessment covering UI automation, manual testing, API automation and a
GitHub workflow, built against the OrangeHRM open-source demo:

- UI under test: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
- API under test: https://jsonplaceholder.typicode.com/users

## Repo structure

```
orangehrm-qa-project/
├── ui-automation/       # Part A — Playwright + TypeScript, Page Object Model
├── manual-tests/        # Part B — manual test case sheet + bug report
├── api-automation/       # Part D — Postman collection, runnable via Newman
├── .github/workflows/    # Part C — CI pipeline that runs UI + API suites together
└── README.md             # this file
```

## Quick start

Each sub-folder has its own README with full setup/run instructions. Short version:

```bash
# UI suite (Part A)
cd ui-automation
npm install
npx playwright install --with-deps
npm test                     # all 4 scenarios, one suite
npm run report                # opens the Allure report

# API suite (Part D)
cd ../api-automation
npm install
npm test                     # runs the Postman collection via Newman
```

### Running everything together (matches CI)

```bash
cd ui-automation && npm ci && npx playwright install --with-deps && npm test
cd ../api-automation && npm ci && npm test
```

Both suites also run individually — each Playwright spec file and the Postman
collection can be executed on its own (see the sub-folder READMEs) — and together
in one CI run, see `.github/workflows/ci.yml`.

## Where each part lives

| Part | Marks | Location |
|------|-------|----------|
| A — UI Automation | 50 | `ui-automation/` |
| B — Manual Testing | 20 | `manual-tests/` |
| C — GitHub Workflow | 10 | this repo's commit history + `.github/workflows/ci.yml` |
| D — API Automation | 20 | `api-automation/` |

## Publishing this repo to GitHub

This folder is plain project files (no `.git` included), so you'll create
the repository yourself. **Don't do a single dump commit** — the assignment
explicitly grades commit history ("meaningful commit history, not a single
dump commit"). Commit in stages that mirror how the project is actually
structured, e.g.:

```bash
cd orangehrm-qa-project
git init

git add .gitignore README.md            # if you added your own .gitignore
git commit -m "chore: scaffold repo structure and top-level README"

git add ui-automation/package.json ui-automation/tsconfig.json \
        ui-automation/playwright.config.ts ui-automation/pages ui-automation/utils
git commit -m "feat(ui): Playwright+TS config and Page Object Model classes"

git add ui-automation/tests ui-automation/README.md
git commit -m "feat(ui): add Q1-Q4 Playwright specs and UI automation README"

git add api-automation
git commit -m "feat(api): Postman collection for JSONPlaceholder /users + Newman runner"

git add manual-tests
git commit -m "feat(manual): manual test cases, traceability matrix, and bug report"

git add .github
git commit -m "ci: add GitHub Actions workflow running UI + API suites together"

# Create a new, EMPTY public repo on github.com (no README/license/gitignore)
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

From then on, keep committing incrementally as you execute the manual tests
and verify things against the live app, rather than adding everything in
one go at the end.

> This zip doesn't include a `.gitignore` — add your own before the first
> commit so you don't check in generated folders: `node_modules/`,
> `ui-automation/playwright-report/`, `ui-automation/allure-results/`,
> `ui-automation/allure-report/`, `ui-automation/test-results/`,
> `api-automation/newman-report/`.

## Reports

- UI: Playwright generates an HTML report and Allure results on every run
  (`ui-automation/playwright-report/`, `ui-automation/allure-report/`).
- API: Newman generates an HTML report on every run
  (`api-automation/newman-report/`).

Both report folders are git-ignored (generated artifacts) and regenerate on every
`npm test` — see each sub-folder's README for how to open them.
