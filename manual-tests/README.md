# Manual Testing

Scope: OrangeHRM **Login, PIM, Admin, and Leave** modules — the same features
covered by the UI automation, but focused on the exploratory/manual
scenarios that complement (not duplicate) the automated flows.

## Files

- `Manual_Test_Cases.xlsx` — 14 test cases across the 4 modules, plus a
  **Traceability Matrix** sheet mapping every module/feature to what covers
  it (automated spec or manual test ID).
  - Columns: Test ID, Module, Title, Preconditions, Steps, Expected Result,
    Actual Result, Status (Pass/Fail), Priority, Severity.
  - Login: empty-field validation, injection-style input, forgot-password
    navigation.
  - PIM: no-results search, delete, required-field validation, special
    characters.
  - Admin: unauthorized access after logout, duplicate username,
    special-character search, session timeout.
  - Leave: invalid date range, leave-balance boundary, cross-role approval.
- `BUG-01_leave_date_range_validation.md` — bug report for the defect found
  while executing the leave date-range test case (From Date later than To
  Date is accepted with no validation).
