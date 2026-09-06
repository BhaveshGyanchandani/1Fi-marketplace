# UPDATE.md — Fixes to align with reference screenshots

This documents where the current build (`1fi-marketplace/`) diverges from the
three reference screenshots (Nearby Stores, Top Brands, "Pay using 1Fi") and
the exact changes needed to close each gap. Written after a direct image-vs-code
comparison — see conversation for the full gap analysis. Apply in order; each
section names the exact file(s) to change.

Do not re-run this against a fresh scaffold — it's a patch spec for the
existing `1fi-marketplace/` codebase, not a from-scratch build like `PROMPT.md`.

## Status

All gaps below have been implemented in this codebase:

| Gap | Status |
|---|---|
| 1 — Hero banner | ✅ `components/shop/ShopHero.tsx`, rendered in `ShopShell` |
| 2 — Tab bar coloring + underline | ✅ `components/shop/ShopTabs.tsx` |
| 3 — Search bar | ✅ `components/shop/SearchBar.tsx`; wired to real filtering on the Marketplace listing, visual-only on Top Brands/Nearby Stores stubs |
| 4 — Nearby Stores location chip | ✅ added to `pages/shop/NearbyStoresPage.tsx` (optional item, done last as suggested) |
| 5 — EMI/CTA restyle | ✅ `components/marketplace/ProceedCTA.tsx` (icon button + arrow pill) and the product detail page header |
| 6 — Re-verify against screenshots | Done for the structural gaps above; a live browser check across breakpoints is still worth doing manually (see README) |

The sections below are kept as the original gap analysis / rationale for each
change, not as an open TODO list.

---

## Gap 1 — Missing hero banner

**Screenshots show:** every Shop tab (Top Brands, Nearby Stores) sits below a
persistent purple hero banner — "NO-COST EMIs" pill badge, "Shop today, Pay
later using Mutual funds." headline, subtext ("No credit score required. No
interest. Backed by your investments."), and a product-collage illustration
(phone/laptop/car/bike bursting from a shopping bag) on the right.

**Current build:** `ShopShell.tsx` has no hero at all — it goes straight from
top padding into the tab bar.

**Fix:**
- Create `components/shop/ShopHero.tsx`: full-bleed purple background
  (`bg-primary` or a subtle gradient), the "NO-COST EMIs" pill badge (small,
  outlined, sparkle icon + uppercase label), headline text with the middle
  line italicized ("Pay later using" in the screenshot reads as an italic
  emphasis line — reproduce that same 3-line hierarchy: plain / italic /
  bold), and the subtext line below.
- The right-side illustration is real 1Fi marketing art — do not attempt to
  reproduce it pixel-for-pixel or source a lookalike image and call it
  accurate. Use a simple placeholder graphic (e.g. a generic shopping-bag SVG
  or omit the illustration and keep the text block full-width) and note in
  the README that the illustration is a simplified placeholder, not the real
  asset.
- Render `<ShopHero />` inside `ShopShell`, above the tabs, on all three tabs
  (Top Brands, Nearby Stores, Marketplace) — it's part of the Shop page
  shell, not tab-specific content.
- Hero is NOT sticky — only the tab bar below it should stick on scroll (this
  matches the screenshots: hero scrolls away, tabs may persist).

## Gap 2 — Tab bar track/pill coloring may be inverted

**Screenshots show:** the inactive tab sits on a light lavender track; the
active tab is a solid white pill with purple text, subtly elevated.

**Current build (`ShopTabs.tsx` line 16):** `bg-primary-50/60` for the outer
track — this was written from memory of the pattern, not re-checked against
the actual images pixel-by-pixel.

**Fix:**
- Re-render `ShopTabs` and visually diff against Image 1/2 (or eyeball
  carefully): confirm outer track color, active-pill white fill, and the
  small underline/indicator beneath the active tab label visible in the
  screenshots (a short purple bar under "Nearby Stores" / "Top Brands" text,
  separate from the pill background).
- Add that underline indicator if missing — it currently isn't in
  `ShopTabs.tsx` at all. A small `<span>` absolutely positioned under the
  active label, or a `border-b-2 border-primary` on the active state, both
  work.

## Gap 3 — No search bar

**Screenshots show:** directly below the tabs, both Top Brands and Nearby
Stores have a full-width white rounded search input with a magnifying-glass
icon and tab-specific placeholder text ("Search stores..." for Nearby
Stores, "Search online stores..." for Top Brands).

**Current build:** no search input anywhere in the Shop shell or any tab.

**Fix:**
- Create `components/shop/SearchBar.tsx`: white pill input, left-aligned
  search icon, placeholder passed as a prop so each tab can customize it.
- Render it in `ShopShell` (or per-tab, since placeholder text differs) right
  below the tab bar.
- For Marketplace, decide and implement one:
  (a) reuse the same search bar wired to actually filter the product grid by
      name/brand (real functionality, not just visual parity), or
  (b) omit it if product search is considered out of scope — if omitting,
      say so explicitly in the README rather than silently diverging.
  Given the assignment rewards "attention to detail," (a) is the stronger
  choice and is a small addition on top of the existing `useProducts` data.

## Gap 4 — Nearby Stores stub has no visual structure

**Screenshots show:** a location selector chip ("Ajmer ▾") aligned right
above the list, and store list-item cards: square logo, store name
(truncated with "..." if long), distance badge top-right ("316 KM"), full
address below in gray.

**Current build (`NearbyStoresPage.tsx`):** a single centered `EmptyState`
with no location chip or list structure — this is correct per the
assignment brief ("no implementation required, can remain blank"), but since
we already have the visual pattern from the screenshot, a closer stub (empty
list state but with the location-chip header still present) would look more
"belongs in the app" than a bare empty state. This is optional polish, not a
functional requirement.

**Fix (optional, low priority):**
- Add the "Ajmer ▾" location chip header above the existing `EmptyState` in
  `NearbyStoresPage.tsx` for visual consistency, without building out any
  actual store list/search logic (still out of scope per the brief).

## Gap 5 — EMI/checkout screen doesn't match the real "Pay using 1Fi" pattern

**Screenshots show (Image 3):** a distinct screen with back arrow + "Pay
using 1Fi" title, a merchant identity block (logo, name, address), a
Navigate/Call/Share icon row, a "Pay Directly" section header with subtext
("Pay any amount, up to 60 months EMIs"), a large centered amount input
(₹ symbol + digit, defaulting to 0), and a bottom action row: a circular
share icon button next to a full-width purple pill "Continue →" button.

**Current build (`ProceedCTA.tsx`, `ConfirmationSummary.tsx`):** a much
simpler sticky bar (monthly amount + single button) and a generic
card-based confirmation summary — neither reflects this specific layout
pattern (title header, icon action row, centered amount entry, circular
button + pill button pairing).

**Fix:**
- This is the biggest structural gap. Decide scope before implementing:
  the assignment's product flow is "select EMI plan → proceed," which is
  conceptually different from 1Fi's real "Pay Directly, enter any amount"
  flow (that screen is amount-first with EMI computed after, not
  plan-first). Don't force-fit the two.
  - **Recommended approach**: keep the plan-first flow (it directly answers
    the assignment brief: "Ability to select an EMI plan, CTA to proceed
    with the selected plan"), but restyle `ProceedCTA` to adopt the visual
    language from Image 3: circular icon button + full-width pill CTA with
    an arrow icon ("Proceed →" instead of plain "Proceed"), same purple fill
    and pill radius.
  - Also restyle the product detail page's own header to match the
    back-arrow + title pattern shown in Image 3 more closely (it's already
    close — confirm arrow icon size/weight matches).
- Do not copy the "Pay Directly" amount-entry pattern verbatim into the
  Marketplace flow — that's a different real screen for a different real
  use case (paying a specific merchant any amount) and forcing it in would
  misrepresent what was actually verified vs. invented.

## Gap 6 — General: re-verify after each fix

**Process gap, not a visual one:** the previous pass built from a written
description of the screenshots (`SKILL.md`) rather than re-inspecting the
actual attached images during implementation, and the closing message
deferred visual QA to the user instead of doing it. Every fix above should
be checked against the actual screenshots before being marked done — note
in commit messages or the README changelog which gaps were closed and
against which image.

---

## Suggested order of implementation

1. Gap 2 (tab bar correction) — smallest, fixes an existing component
2. Gap 1 (hero banner) — new component, high visual impact, referenced by
   both existing tabs
3. Gap 3 (search bar) — new component, moderate effort, adds real filtering
   value to Marketplace
4. Gap 5 (EMI/CTA restyle) — moderate effort, don't over-scope into copying
   the wrong screen's pattern
5. Gap 4 (Nearby Stores chip) — optional, do last if time allows

## Out of scope, explicitly

- Reproducing the exact hero illustration artwork (real 1Fi marketing asset)
- Building out real Nearby Stores search/list functionality
- Building the literal "Pay Directly, enter any amount" flow as a second
  checkout path alongside the plan-based one — pick one flow per Gap 5's
  reasoning, don't build both
