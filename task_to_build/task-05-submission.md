# Task: Phase 5 - Price Submission

## Objective
Allow authenticated users to submit new price entries.

## Steps
- [x] Create `SubmitPriceForm` Component <!-- id: 0 -->
    - Fields: Product Name, Price, Unit (Select), Store Name, Location.
    - Validation: Zod schema (required fields, positive price).
- [x] Implement Submission Logic <!-- id: 1 -->
    - `useSubmitPrice` mutation.
    - Insert into `price_entries`.
    - Auto-fill `user_id` from session.
- [x] UI Feedback <!-- id: 2 -->
    - Loading state on Submit button.
    - Toast notification on success/error.
    - Reset form after success.
- [x] Protection <!-- id: 3 -->
    - Ensure only logged-in users can see/submit the form (or redirect to login).

## Deliverables
- Functional form that writes to the database and updates the feed immediately.
