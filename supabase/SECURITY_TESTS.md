# Community security verification

Run these checks against the configured Supabase project before enabling public participation.

1. Signed out: archive and discussion reading works; `/community/new`, `/profile`, and `/community/moderation` redirect to sign-in.
2. User A: create a discussion and reply, edit both, delete both, save and remove content, and edit the public profile.
3. User B: attempt direct update/delete requests against User A’s discussion, reply, profile, and saved rows. Every request must fail under RLS.
4. User B: report User A’s discussion and reply; verify User B cannot read the `reports` table.
5. Moderator: open `/community/moderation`, review reports, lock/hide/remove a discussion, hide/remove a reply, and pin a discussion.
6. Ordinary user: attempt to update `status`, `pinned`, or `role` through the Data API. Database triggers/column grants must reject it.
7. Public API: request `profiles.user_id`, `auth.users`, `reports`, `saved_content`, and `analytics_events`. Private fields/rows must not be returned.
8. Injection: post text containing `<script>alert(1)</script>` and Markdown HTML. It must display as inert text, never execute.
9. Cooldown: submit two discussions within 15 seconds and two replies within 10 seconds. The second write must be rejected.
10. Impact: load a scripture/place/field note, play audio, and start a practice. Confirm only the corresponding aggregate counters increase and no IP, email, or location is stored in `analytics_events`.

Also test email confirmation, sign-in, sign-out, invalid passwords, expired confirmation links, mobile navigation, keyboard focus, and the configured CAPTCHA/rate limits.
