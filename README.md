# Scripture in Sound

A beginner-friendly Next.js website about Buddhist scriptures, chanting, pronunciation practice, meditation, and reflection.

## Edit the Site

- Home page: `app/page.tsx`
- Guided Practice page: `app/guided-practice/page.tsx`
- Sources & Ethics page: `app/sources-ethics/page.tsx`
- Shared layout and navigation: `app/layout.tsx`
- Colors and global styles: `app/globals.css`

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy on Vercel

This project uses Next.js and includes `@vercel/analytics`. After deployment on Vercel, page views will be tracked through the Analytics component in `app/layout.tsx`.
