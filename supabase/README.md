# Supabase community setup

The website builds safely without Supabase credentials. In that state public archive pages remain available, Community shows a truthful empty state, and account actions explain that configuration is pending.

## 1. Create the project

1. Create a Supabase project at <https://supabase.com/dashboard>.
2. Open **SQL Editor** and run `supabase/migrations/202609280001_community.sql` once.
3. In **Project Settings → API** (or the project **Connect** dialog), copy the Project URL and the publishable key. Do not use or expose the service-role/secret key in this application.

## 2. Configure local development

Copy `.env.example` to `.env.local` and fill in:

```text
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=false
```

Restart `npm run dev` after changing environment variables.

## 3. Configure authentication

In **Authentication → URL Configuration**:

- Site URL: `https://www.scriptureinsound.com`
- Redirect URLs:
  - `https://www.scriptureinsound.com/auth/callback`
  - `http://localhost:3000/auth/callback`

Keep email confirmation enabled. Before a public launch, configure custom SMTP because the built-in Supabase sender is intended for limited testing. Review Authentication rate limits and enable CAPTCHA for sign-up/sign-in in production.

For Google sign-in:

1. Create Google OAuth web credentials.
2. Add the callback URL shown by Supabase to Google’s authorized redirect URIs.
3. Enable Google under **Authentication → Providers** and enter the Google client credentials.
4. Set `NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=true` locally and in Vercel.

## 4. Configure Vercel

Add the same four variables under **Project Settings → Environment Variables**. For production, `NEXT_PUBLIC_SITE_URL` must be `https://www.scriptureinsound.com`. Apply them to Production and Preview as appropriate, then redeploy.

## 5. Make the project owner an administrator

Create and confirm your account through the website. Then run this in Supabase SQL Editor, replacing the email:

```sql
update public.profiles p
set role = 'admin'
from auth.users u
where p.user_id = u.id
  and u.email = 'YOUR_EMAIL@example.com';
```

The account menu will then expose `/community/moderation`. Never build an admin-role selector into the public profile form.

## Security model

- `profiles.user_id` is the private authentication identifier. It is not granted through the public Data API.
- `profiles.id` is a separate public community identifier used for authorship relationships.
- Row Level Security is enabled on every community table.
- Public visitors may read visible discussions, replies, relations, and non-sensitive profile columns.
- Signed-in users may create content only as their own public profile, and edit/delete only their own content.
- Database triggers prevent ordinary users from changing moderation fields.
- Reports are readable and actionable only by moderators/admins.
- Saved content is visible only to its owner.
- Raw analytics events have no direct read or write policy; narrow RPC functions record allowed event types and return aggregate totals.
- User prose is rendered as plain text. Arbitrary HTML and script markup is never interpreted.

Run the scenarios in `supabase/SECURITY_TESTS.md` after the project is connected.
