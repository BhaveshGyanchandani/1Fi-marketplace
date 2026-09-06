---
name: 1fi-marketplace-consistency
description: Design and engineering conventions for building the 1Fi Marketplace section so it matches the existing 1Fi app. Read before writing any UI code for this assignment.
---

# 1Fi Marketplace — Consistency Skill

This skill captures what we know about the real 1Fi app so every screen you build
looks and behaves like it belongs there — not like a bolted-on demo. Reference this
before writing any component.

## What 1Fi actually is

1Fi is a consumer fintech app: **"Shop today, Pay later using Mutual Funds."** Users
buy products (primarily smartphones) on EMI, and the EMI is collateralized against
their mutual fund holdings rather than a CIBIL-checked loan. Confirmed product facts:

- 0% interest EMI on select tenures
- Tenures ranging 3–24 months
- No CIBIL check — eligibility is tied to pledged mutual fund value ("Limit")
- Users can close the loan early by paying the outstanding amount

This context matters: EMI plan cards should foreground **tenure** and **monthly
amount**, not interest rate (since flagship plans are 0% interest) or credit score
messaging (there isn't one).

## Confirmed real-app details (verified via live app, Sept 2026, and exact classes supplied directly)

- **Primary brand color:** `#712CDC` (purple) — use as the primary action/accent color
- **Bottom navigation, in order:** Home · Shop · EMI Dues · Limit · Profile
- **Shop page (as it exists today):** a hero banner ("Shop today, Pay later using
  Mutual funds"), then two tabs: **Top Brands** and **Nearby Stores** (currently
  empty — "No matching stores found")
- Our job: add a **third tab, "1Fi Marketplace,"** alongside these two, and fully
  build it out

The following are now **verified exact values** (supplied directly against the
real app, not assumed defaults) — see `UPDATE.md` and the conversation history
for how each was confirmed:

- Hero banner wrapper: `532x354`; the banner image itself renders at a fixed
  `582.2x390.98` and is cropped into that wrapper via `object-cover` +
  `overflow-hidden` on the wrapper (real internal-cropping pattern, not a
  pre-cropped source asset)
- Tab track (Top Brands / Nearby Stores / 1Fi Marketplace switcher): exact
  class `flex gap-2 rounded-full border border-[#ece5ff] bg-[#f5f0ff] p-1.5
  shadow-[0_1px_3px_rgba(113,44,220,0.06)]`, fixed `468x56`
- Active tab pill: exact class `relative flex-1 rounded-full py-[11px]
  text-center text-sm font-semibold tracking-[-0.005em] transition-all
  bg-white text-[#712CDC] shadow-[0_1px_3px_rgba(20,14,50,0.10),0_0_0_1px_rgba(113,44,220,0.08)]`,
  plus a short (`h-[3px] w-8`) purple underline bar centered beneath the
  active label
- Bottom nav card: exact class `mx-auto flex max-w-[500px] items-stretch
  rounded-[28px] bg-white border border-white/40 px-1.5 py-1.5
  shadow-[0_8px_32px_rgba(20,14,50,0.12),0_0_0_1px_rgba(255,255,255,0.18)_inset]`,
  rendered `fixed bottom-0` (always visible/clickable, not scroll-away —
  confirmed explicitly, see `UPDATE.md`)
- Marketplace listing item (real reference: "Air India — No-cost EMIs upto 18
  months" card): outer `flex w-full cursor-pointer items-center gap-3
  rounded-[18px] border border-zinc-200 bg-white p-3.5 text-left
  shadow-[0_2px_6px_rgba(20,14,50,0.04)] transition-shadow
  hover:shadow-[0_6px_16px_rgba(20,14,50,0.06)]`; image wrapper `flex h-16
  w-16 relative overflow-hidden rounded-xl border border-gray-200
  items-center justify-center shrink-0 mr-2`; text wrapper `min-w-0 flex-1
  flex flex-col justify-between` (the originally-supplied `items-between`
  is not a valid Tailwind class and was corrected to make `justify-between`
  functional)

Anything not listed above (font family, exact gray-scale values elsewhere,
spacing not explicitly given) is still a **reasonable default**, not verified —
keep flagging those as assumptions in the README rather than presenting them
as confirmed.

## Visual conventions to follow

- **Tabs**: Top Brands | Nearby Stores | 1Fi Marketplace — same tab bar component,
  same active/inactive state styling across all three (see exact classes above)
- **Color**: `#712CDC` as primary; keep a neutral gray scale for backgrounds/text/borders;
  reserve the purple for CTAs, active states, selected EMI plan, and price emphasis
- **Cards**: rounded corners (12–16px), soft shadow, consistent internal padding —
  product/listing cards and EMI plan cards should share the same card "shell" feel
- **Typography**: one scale reused everywhere — page title, section header, card
  title, body, caption. Don't introduce a new size/weight per screen.
- **CTA buttons**: full-width primary button on mobile, purple fill, white text,
  consistent radius with cards
- **Bottom nav is `fixed bottom-0`, always visible and clickable** — it renders as
  a sibling AFTER the page's main content wrapper, not nested inside a scrollable
  container, precisely because `fixed` positioning ignores an ancestor's box
  regardless of DOM nesting. Page containers must reserve bottom padding
  (`pb-24`) so scrolled content never ends up hidden underneath it.

## Engineering conventions

- **No hardcoded product/EMI data in components.** Every screen reads from a
  data-fetching hook backed by a mock API route — never inline arrays in JSX.
- **Every async screen has three states**: loading (skeleton), error (retry CTA),
  and empty (no products / no EMI plans available).
- **Shared types** (`Product`, `ProductVariant`, `EMIPlan`) live in one place and are
  imported everywhere — never redefined per component.
- **Component reusability**: `MarketplaceListItem` (the real 1-per-row listing
  card — see confirmed classes above) and `EMIPlanCard` must be pure/presentational
  and reusable outside the page that first needed them. `ProductCard` and the old
  2-column `ProductGrid` are retired — the real Marketplace listing is a vertical
  list, one item per block, not a grid.
- **State management**: local component state / React Context is sufficient for this
  scope. Do not introduce Redux or a global store for a single-section feature.

## What NOT to do

- Don't redesign Top Brands or Nearby Stores — they stay blank placeholders per the brief.
  This work is limited to a `MarketplaceIcon`, section header, or empty tab shell for the
  other two so the tab bar is complete — not a full implementation.
  Marketplace tab is fully built by the assignment.
- Don't invent a different bottom nav or navigation pattern — reuse Home/Shop/EMI Dues/Limit/Profile.
- Don't add credit-score or interest-rate-heavy messaging — it doesn't match 1Fi's actual model.
- Don't present assumed visual details (exact spacing values, font family) as verified —
  flag them as reasonable defaults in the README.
- Don't render the Marketplace listing as a grid — it's confirmed 1 item per block
  (see `MarketplaceListItem.tsx`), not `ProductCard`/`ProductGrid`'s old 2-column layout.
