# Custom Domain Setup

Use this guide after buying the domain.

Likely domain:

https://scriptureinsound.com

## What To Do After Buying The Domain

1. Go to Vercel.
2. Open the Scripture in Sound project.
3. Go to `Settings`.
4. Open `Domains`.
5. Add `scriptureinsound.com`.
6. Add `www.scriptureinsound.com` if Vercel recommends it.
7. Follow the exact DNS records shown by Vercel.
8. Do not guess DNS records.
9. Do not copy DNS values from a tutorial unless Vercel shows the same values for this project.

## DNS Records

Vercel will show the exact DNS records to add at your domain registrar.

Common examples may include `A`, `CNAME`, or nameserver records, but you should not choose these yourself. Use only the exact records Vercel shows in the project dashboard.

## Wait For DNS Propagation

DNS changes can take time. Sometimes they work in a few minutes. Sometimes they can take several hours.

During this time, the old Vercel URL should still work:

https://scripture-in-sound.vercel.app/

## Test The Custom Domain

After Vercel says the domain is valid, test both:

https://scriptureinsound.com

https://www.scriptureinsound.com

Also test the three main pages:

- https://scriptureinsound.com/
- https://scriptureinsound.com/guided-practice
- https://scriptureinsound.com/sources-ethics

If `www` and non-`www` behave differently, check the Vercel Domains page and follow its instructions.
