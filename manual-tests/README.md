# Part B — Manual Testing

Scope: OrangeHRM **Login, PIM, Admin, and Leave** modules — the same features
covered by the Part A automation, but focused on the exploratory/manual
scenarios that complement (not duplicate) the four automated flows.

## Files

- `Manual_Test_Cases.xlsx` — 14 test cases across the 4 modules, plus a
  **Traceability Matrix** sheet mapping every module/feature to what covers
  it (automated spec or manual test ID).
  - Columns: Test ID, Module, Title, Preconditions, Steps, Expected Result,
    Actual Result, Status (Pass/Fail), Priority, Severity.
  - TC-01–03: Login (empty-field validation, injection-style input,
    forgot-password navigation).
  - TC-04–07: PIM (no-results search, delete, required-field validation,
    special characters).
  - TC-08–11: Admin (unauthorized access after logout, duplicate username,
    special-character search, session timeout).
  - TC-12–14: Leave (invalid date range, leave-balance boundary, cross-role
    approval).
- `BUG-01_leave_date_range_validation.md` — bug report for the defect found
  while drafting/executing TC-12 (From Date later than To Date is accepted
  with no validation).

## How these were produced, and what's left to do

I don't have live browser access to the demo site from this environment, so
the **Expected Result** for every case and the **Actual Result / Status /
bug report** for TC-12 are provided as a complete, ready-to-execute
template — TC-12 already shows the expected write-up format for a found
defect. Before submitting:

1. Actually run each test case against
   https://opensource-demo.orangehrmlive.com/web/index.php/auth/login.
2. Fill in **Actual Result** and **Status (Pass/Fail)** for every row from
   your own run (most are currently `Not Executed`).
3. Re-verify TC-12/BUG-01 against the live app, attach a real screenshot to
   the bug report, and adjust the wording if the live behavior differs from
   what's described.
4. If you find additional defects while executing, copy
   `BUG-01_leave_date_range_validation.md` as a template for each new one.
