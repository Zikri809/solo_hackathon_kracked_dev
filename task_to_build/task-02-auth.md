# Task: Phase 2 - Authentication

## Objective
Implement Supabase Authentication using Magic Links and create Auth UI components.

## Steps
- [x] Configure Supabase Auth <!-- id: 0 -->
    - Verify Email Auth is enabled (default).
    - Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are variables.
- [x] Create Auth Components <!-- id: 1 -->
    - `AuthButton.tsx`: Signs user in/out.
    - `LoginForm.tsx`: Simple email input for magic link.
- [x] Implement Auth Context/Hooks <!-- id: 2 -->
    - Ensure session state is globally accessible (Supabase `onAuthStateChange`).
    - Test `useUser()` hook or equivalent.
- [x] Verify Auth Flow <!-- id: 3 -->
    - Test Sign In with Magic Link.
    - Test Sign Out.
    - Verify `user_id` is available in session.

## Notes
- Use `shadcn/ui` components for the login form.
- Keep it simple: Magic Link only for MVP.
