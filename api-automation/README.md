# Part D — API Automation (Postman + Newman)

Collection: `JSONPlaceholder-Users.postman_collection.json`
API under test: https://jsonplaceholder.typicode.com/users

## What it does

| # | Request | Validates |
|---|---------|-----------|
| 1 | `GET /users` | status code is 200; response is a non-empty array; every user has `id`, `name`, `email`; extracts the first user's `id` (and full object) into collection variables |
| 2 | `PUT /users/{{storedUserId}}` | pre-request script builds the endpoint from the id stored by request 1, and builds a body that changes `name`, `email`, `company.name` to fresh dynamically-generated values while keeping the rest of the original user (so `phone` survives); test script asserts status 200, returned `id` matches the stored id, `phone` is not empty, and the three changed fields reflect the update |

Both requests assert their status code, per the assignment's mandatory requirement.

## Setup

```bash
npm install
```

This installs [Newman](https://github.com/postmanlabs/newman) and the
`newman-reporter-htmlextra` HTML reporter as dev dependencies — no global
install needed.

## Running

```bash
npm test          # runs the collection headlessly + writes an HTML report
npm run test:cli   # same run, console output only, no HTML report
```

Report is written to `newman-report/report.html` after every run.

You can also run it directly with `npx newman` (or the Postman GUI, using
"Import" on the collection file):

```bash
npx newman run JSONPlaceholder-Users.postman_collection.json
```

## Standalone vs combined run

This collection is a single self-contained suite — `npm test` here runs it
completely on its own. The same command is also what the root CI workflow
(`.github/workflows/ci.yml`) calls as the "API suite" step of the combined
run, alongside the Part A UI suite.

## Notes

- No environment file is required — `baseUrl` and all working variables
  (`storedUserId`, `storedUser`, `updatedBody`, `randomSuffix`) live as
  collection variables set at runtime by the scripts, so the collection is
  fully portable between Postman and Newman.
- JSONPlaceholder is a fake/mock API: it doesn't persist writes. The `PUT`
  response is what the API echoes back for the request it received, which
  is why the request body is built from the original fetched user (so
  fields we didn't intend to change, like `phone`, are still present to
  validate against).
