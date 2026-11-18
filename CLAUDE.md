# CLAUDE.md: context for Claude Code

## What this is
Coming-soon page for **Purple Line Consent** (purplelineco.com), the first product from Purple Line Co.
It's a tattoo-shop consent/release-form kiosk that runs on a dedicated iPad at the front desk.
The goal of this page is to collect early-access signups from shop owners.

## Product facts (keep copy consistent with these)
- Runs on an iPad in a **Lilitab Flip** counter kiosk with the **Lilitab iPad ID Scan Shelf**,
  a black shelf on an arm at the **top left** of the kiosk. Clients set their ID on it and tap Take photo.
- **Works without Wi-Fi**: releases are held encrypted on the iPad and sync automatically when it reconnects.
- **Never uses the client's phone**: no QR codes, texted links or app downloads.
- Flow: Welcome → details (name, DOB, contact) → tattoo & health checklist → consent terms → ID photo → signature → done.
- Planned price: $35 per shop / month (not shown on this page yet).
- Sample shop in the demo: "Rose City". Sample client: Alex Rivera. The demo ID must always read "SAMPLE ID".
- Brand name in copy: "Purple Line Co." (company), "Purple Line Consent" (product). Don't shorten the product to just "Consent".

## Stack + conventions
- Next.js App Router, JavaScript (no TypeScript), plain CSS Modules. No Tailwind, no UI library.
- Brand tokens live in `app/globals.css` (`--purple: #5a2ca0` stencil purple, ink `#1d1b1f`). Use the variables.
- Shared button classes: `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-lg` (global).
- Icons: inline SVG components in `components/icons.jsx` (Lucide paths). No icon packages.
- Accessibility: real buttons/links/labels, visible focus, 4.5:1 text contrast, respect `prefers-reduced-motion`.

## The kiosk demo
- `components/KioskDemo/timeline.js` is the single source of truth: scene order, durations, and
  `computeFrame(t)` which returns plain data for the current moment. Scenes only render that data.
- Kiosk screens are drawn at the iPad 11" landscape size (1180×820) in px, then scaled with a CSS transform.
- The hero's "Watch a check-in" dispatches `RESTART_DEMO_EVENT`; `useWalkthrough` listens and restarts.
- The demo pauses when off screen and doesn't autoplay for reduced-motion users.

## Open items
See the TODO list in README.md (logo, form endpoint, founding offer, Instagram, favicon/OG image).
