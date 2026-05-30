# Deployment Guide

This guide explains how to publish and update Scripture in Sound.

## Current Website

Current Vercel URL:

https://scripture-in-sound.vercel.app/

Future custom domain:

https://scriptureinsound.com

The current Vercel URL should keep working even after a custom domain is added.

## How Deployment Works

This project is deployed through GitHub and Vercel.

The basic flow is:

1. Edit the website files on your computer.
2. Test the site locally.
3. Commit the changes with Git.
4. Push the changes to GitHub.
5. Vercel sees the GitHub update and deploys the site automatically.

## Important Files

- Home page: `app/page.tsx`
- Guided Practice page: `app/guided-practice/page.tsx`
- Sources & Ethics page: `app/sources-ethics/page.tsx`
- Shared layout and navigation: `app/layout.tsx`
- Site domain config: `lib/site.ts`
- Global styles: `app/globals.css`

## Test Before Deploying

Run:

```bash
npm run build
```

Only deploy if the build passes.

## Check The Main Routes

Check these pages locally and after deployment:

- `/`
- `/guided-practice`
- `/sources-ethics`

On the current Vercel site, test:

- https://scripture-in-sound.vercel.app/
- https://scripture-in-sound.vercel.app/guided-practice
- https://scripture-in-sound.vercel.app/sources-ethics

After the custom domain is connected, test:

- https://scriptureinsound.com/
- https://scriptureinsound.com/guided-practice
- https://scriptureinsound.com/sources-ethics

## Deploy Through GitHub And Vercel

1. Push the latest code to GitHub.
2. Open Vercel.
3. Open the Scripture in Sound project.
4. Vercel will automatically build and deploy the latest GitHub version.
5. If the deployment fails, read the Vercel build log and fix the error before trying again.

## Connect A Custom Domain In Vercel

1. Open the Scripture in Sound project in Vercel.
2. Go to `Settings`.
3. Open `Domains`.
4. Add `scriptureinsound.com`.
5. Add `www.scriptureinsound.com` if Vercel recommends it.
6. Follow the exact DNS records Vercel shows.
7. Do not guess DNS records.
8. Wait for DNS propagation.
9. Test the custom domain after Vercel says it is valid.

## Better Mainland China Access

This site avoids Google Fonts, external CDN fonts, and required third-party images or audio.

The pages are mostly static, which helps them load more reliably. Vercel Analytics is included, but it can be disabled in `app/layout.tsx` if it causes access issues in some regions.

## Update The Website Later

After editing:

```bash
npm run build
git status
git add .
git commit -m "Describe the update"
git push
```

Vercel will redeploy automatically after `git push`.
