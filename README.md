# Sphiwesihle Private Clinics & Pharmacies

A modern, fast, accessible marketing + booking website for a private
primary-healthcare clinic and pharmacy in Pretoria, South Africa. Built with
Next.js (App Router), TypeScript and Tailwind CSS.

## Tech stack

- **Next.js 16** (App Router, React Server Components)
- **TypeScript** (strict, no `any`)
- **Tailwind CSS v4** with a CSS-variable design-token layer (`app/globals.css`)
- **next/font** (Sora display + Inter body), **next/image** for all imagery
- **Zod** validation, **Server Actions** for forms
- **Resend** for transactional email (optional, env-flagged)
- **Paystack** for the optional appointment-deposit flow (hosted checkout — we
  never touch raw card data)
- **Vercel Analytics** with a pluggable `trackEvent` hook (`lib/analytics.ts`)
- `lucide-react` icons, `framer-motion` for restrained motion

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — site runs without any keys
npm run dev                  # http://localhost:3000
```

Build & run production:

```bash
npm run build
npm start
```

## Environment variables

All are **optional** for local development (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, robots, JSON-LD, Paystack callback |
| `RESEND_API_KEY` | Enables real email delivery of form submissions |
| `RESEND_FROM` | Verified sender address |
| `CONTACT_INBOX` | Destination inbox (defaults to the clinic email) |
| `PAYSTACK_SECRET_KEY` | Enables the optional `/book` deposit flow |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack public key (client) |
| `PAYSTACK_DEPOSIT_AMOUNT` | Deposit amount in ZAR (default 150) |

**Graceful degradation:** without `RESEND_API_KEY`, form submissions are
validated and logged server-side (nothing is lost). Without
`PAYSTACK_SECRET_KEY`, the deposit UI is hidden and `/book` shows payment
options instead.

## Content layer (single source of truth)

All copy lives in typed data files under `lib/content/`, so every page reads
from one place — ready to swap for a CMS later.

| File | Contains |
| --- | --- |
| `clinic.ts` | Brand, contact details, hours, `isOpenNow()` |
| `services.ts` | The 9 services + emergency care + dropdown options |
| `faqs.ts` | FAQ entries |
| `highlights.ts` | Trust strip, "why choose us", badges |
| `types.ts` | Shared TypeScript types |

### Add a service

Append an entry to the `services` array in `lib/content/services.ts`:

```ts
{
  slug: "dental-care",            // becomes /services/dental-care
  title: "Dental Care",
  blurb: "Short one-liner for cards.",
  description: "Longer intro for the detail page.",
  icon: SomeLucideIcon,           // import from lucide-react
  includes: ["Item one", "Item two"],
}
```

The card, detail page (`/services/[slug]`), sitemap entry, footer link and
booking dropdown all update automatically.

### Add an FAQ

Append a `{ question, answer }` object to `faqs` in `lib/content/faqs.ts`. It
appears in the accordion and the FAQ JSON-LD.

## Project structure

```
app/
  layout.tsx            Root layout: fonts, metadata, header/footer/FAB, JSON-LD
  page.tsx              Home
  services/             /services + /services/[slug]
  contact/              /contact, server actions, forms
  book/                 /book + Paystack deposit + /book/callback
  sitemap.ts, robots.ts
components/
  ui/                   Button, Cta, Container, Section, OpenStatusPill
  layout/               SiteHeader, Footer, WhatsAppFab, Logo
  sections/             Hero, ServicesGrid, WhyChooseUs, FaqAccordion, …
  forms/                BookingForm, EnquiryForm, DepositForm, fields
  seo/                  JSON-LD structured data
lib/
  content/              Typed content layer
  analytics.ts, validation.ts, email.ts, paystack.ts, rate-limit.ts, booking.ts
public/images/          Logo + clinic photos
```

## Notes / TODOs

- **Address & map coordinates** in `lib/content/clinic.ts` are placeholders
  (`123 Healthcare Avenue`, Pretoria CBD geo) — confirm with the client and
  update `address` + `geo`.
- **Logo:** the header/footer render the brand mark from
  `public/images/logo/logo-mark.jpg` (see `components/layout/logo.tsx`). Swap
  that file (ideally a transparent PNG) to update the logo site-wide.
- Compliance copy uses **POPIA** (South Africa), not HIPAA.

## Deploy (Vercel)

Push to a Git repo and import into Vercel. Set the environment variables above
in the Vercel dashboard. `NEXT_PUBLIC_SITE_URL` should be the production domain.

## Deploy (Plesk — Node.js / Phusion Passenger)

This app ships with a custom `server.js` so it runs under Plesk's Node.js
extension. (A custom server is required because Passenger needs a startup file;
note it cannot be combined with Next's `output: "standalone"`.)

**1. Get the code onto the server** — either connect the Git repo via
*Websites & Domains → Git*, or upload the project (excluding `node_modules` and
`.next`) to the domain's document root.

**2. Enable Node.js** (*Websites & Domains → Node.js*) and set:

| Field | Value |
| --- | --- |
| Node.js version | 20.x or newer (see `.nvmrc` / `engines`) |
| Application Root | the folder containing `package.json` |
| Application Startup File | `server.js` |
| Application Mode | `production` |

**3. Set environment variables** under *Custom environment variables* (see
`.env.example`). Set `NEXT_PUBLIC_SITE_URL` to the production domain **before
building** — it is inlined at build time.

**4. Install & build**, then start:

```bash
npm install        # or use Plesk's "NPM install" button
npm run build      # produces .next/ (run AFTER env vars are set)
```

Then click **Restart App** in Plesk. Passenger runs `server.js`, intercepts the
`listen()` call and serves the app through the domain. Re-run `npm run build`
and **Restart App** after every code change.

> Tip: to smoke-test the production server locally, run `npm run build` then
> `npm run start:plesk` (i.e. `node server.js`) and open http://localhost:3000.
