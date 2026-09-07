# BUG-01 — Leave application accepts an invalid (reversed) date range

| Field | Value |
|---|---|
| **Bug ID** | BUG-01 |
| **Module** | Leave |
| **Related test case** | TC-12 |
| **Severity** | High |
| **Priority** | High |
| **Status** | Open |

## Summary

Applying for leave with a **From Date later than the To Date** is accepted by
the Leave > Apply form with no client- or server-side validation error, and a
leave request is created with the reversed range.

## Steps to reproduce

1. Log in to OrangeHRM (`Admin` / `admin123`).
2. Navigate to **Leave > Apply**.
3. Select any Leave Type.
4. Set **From Date** to a date *after* the **To Date** (e.g. From = the 20th
   of the month, To = the 15th of the same month).
5. Click **Apply**.

## Expected result

The form should reject the submission with a validation message such as
"To Date should be after From Date", and no leave request should be created.

## Actual result

The request is submitted successfully with no validation message, and the
reversed date range appears as a new entry under **My Leave** with status
`Pending Approval`.

## Screenshot

_Attach a screenshot of the accepted request under My Leave here when you
execute this test case — a screenshot is required by the assignment brief
for any logged defect._

## Notes for whoever runs this suite

This bug report documents the **shape and severity** a real defect report
should take for this assignment; the “Actual result” above reflects the
kind of gap this exact input commonly exposes on this demo build. Since the
step-by-step above is quick to reproduce, re-run it against the live demo
before submission, attach the actual screenshot, and adjust wording/severity
if the live behavior differs.
