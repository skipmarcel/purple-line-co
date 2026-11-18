# purplelineco.com: Purple Line Consent (coming soon)

The coming-soon / early-access page for **Purple Line Consent**, the tattoo consent
kiosk from Purple Line Co. Built with Next.js (App Router) and plain CSS Modules.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

Node 18.18+ (Node 20 or 22 recommended).

## Project structure

```
app/
  layout.js            Fonts (Inter), page title, social preview metadata
  page.js              Puts the sections in order
  globals.css          Brand tokens (colors, radii), buttons, base styles
components/
  Header.jsx           Logo + "Get early access"
  Hero.jsx             Headline, pitch, buttons ("Watch a check-in" restarts the demo)
  Features.jsx         The three selling points
  EarlyAccess.jsx      Waitlist form (email, shop, artists) with validation + success state
  Footer.jsx           Logo, email
  Logo.jsx             Two-hands logo as inline SVG, colored by brand tokens
  icons.jsx            Inline Lucide-style SVG icons
  KioskDemo/
    KioskDemo.jsx      The iPad frame, scaling, play/pause, progress
    useWalkthrough.js  The animation clock (rAF, pauses off screen, reduced motion)
    timeline.js        Scene order + timings + what each scene shows at time t
    IdShelf.jsx        The Lilitab ID Scan Shelf drawn beside the iPad
    scenes/            One file per kiosk screen (Welcome, Details, Health, Agreement, ID, Sign, Done)
      Kiosk.module.css Kiosk screen styles, drawn at the iPad's 1180×820 size
public/                Put logo.svg, favicon, og-image.png here
```

## Before launch: TODO

- [x] **Logo**: `components/Logo.jsx` (header + footer). Brand-purple copy in `public/logo.svg`.
- [ ] **Waitlist form**: create a form endpoint (Formspree, Tally webhook, Mailchimp, or a Next.js API route),
      then copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WAITLIST_ENDPOINT`.
      Also set it in Vercel/Netlify project settings. Without it the form only shows the success state.
- [ ] **Founding-shop offer**: replace "a special launch rate" in `components/EarlyAccess.jsx` with the real offer.
- [ ] **Instagram**: add a link in `components/Footer.jsx` once the handle exists (removed for now).
- [x] **Favicon**: `app/icon.svg` + `app/apple-icon.png` (white logo on brand purple).
- [ ] **Social image**: `app/opengraph-image.png` (1200×630; Next picks it up automatically).
- [ ] **Email**: set up the hello@purplelineco.com mailbox, then point the `mailto:` links in `Footer.jsx` and `EarlyAccess.jsx` at it (they go to a personal Gmail for now).

## Deploy

1. Push to GitHub.
2. Import the repo in Vercel (or Netlify). No extra config needed.
3. Add `NEXT_PUBLIC_WAITLIST_ENDPOINT` in the project's environment variables.
4. Point purplelineco.com at it in the domain settings. Redirect tattooconsentform.com
   (and tattoorelease.com) to purplelineco.com with a permanent (301) redirect.
