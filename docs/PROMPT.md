# PROMPT.md — Build Prompts for 1Fi Marketplace

Staged prompts for driving the implementation with an AI coding assistant
(Claude Code, Cursor, etc.), in the order they should be run. Each stage assumes
`SKILL.md`, `PROJECT.md`, and `ARCHITECTURE.md` are in context or attached.

Do not run these blind — review the diff at every stage. Assignments like this
are graded partly on whether the *engineer* clearly understood the tradeoffs, not
just on whether the code compiles.

---

## Stage 0 — Scaffold

```
Read docs/PROJECT.md and docs/ARCHITECTURE.md in this repo.
Scaffold a Next.js (App Router) + TypeScript + Tailwind project matching the
folder structure in ARCHITECTURE.md exactly. Create empty files with just
export stubs and TODO comments for now — no logic yet. Set the Tailwind theme
primary color to #712CDC per SKILL.md. Don't invent extra folders or files
beyond what ARCHITECTURE.md lists.
```

## Stage 1 — Data layer

```
Implement lib/types.ts per the data models in ARCHITECTURE.md section 3.
Then create lib/data/products.json with 6 mock smartphone products (mix of
brands, each with 2-3 variants) — this is placeholder data, keep prices in INR
and realistic for the Indian market.
Implement the three API routes in ARCHITECTURE.md section 4, computing EMI
plans server-side per section 4's formula (0% interest, tenures of 3/6/9/12/18/24
months where sensible for the price point — don't offer a 24-month plan on a
₹15,000 phone, use judgment). Return the {data} / {error} shape consistently.
```

## Stage 2 — Data hooks

```
Implement lib/hooks/useProducts.ts, useProduct.ts, and useEmiPlans.ts.
Each should expose { data, isLoading, error } and handle fetch failures
gracefully. No component should ever call fetch() directly — only these hooks.
```

## Stage 3 — Shared UI primitives

```
Implement components/ui/Skeleton.tsx, ErrorState.tsx, EmptyState.tsx, and
Button.tsx. Button should support primary (filled #712CDC) and secondary
(outline) variants, full-width option, and a disabled state. These are used
everywhere else — keep them dependency-free and presentational.
```

## Stage 4 — Shop shell

```
Implement components/shop/ShopTabs.tsx (Top Brands | Nearby Stores | 1Fi
Marketplace, matching the real 1Fi Shop page tab pattern described in
SKILL.md) and components/shop/BottomNav.tsx (Home / Shop / EMI Dues / Limit /
Profile — Shop active). Then wire app/shop/page.tsx to route between the three
tabs, and stub top-brands/page.tsx and nearby-stores/page.tsx as blank pages
per the brief — don't build these out.
```

## Stage 5 — Marketplace listing

```
Implement components/marketplace/ProductCard.tsx and ProductGrid.tsx, then
app/shop/marketplace/page.tsx using useProducts(). Show the skeleton grid
while loading, ErrorState with a retry button on failure, EmptyState if the
list is empty. Each ProductCard shows image, name, brand, and "From ₹X/mo"
computed from the cheapest variant's shortest-tenure EMI plan — pull this
from the product's own EMI data, don't hardcode a formula in the card.
```

## Stage 6 — Product detail + EMI selection

```
Implement components/marketplace/VariantSelector.tsx, EMIPlanCard.tsx,
EMIPlanSelector.tsx, and ProceedCTA.tsx, then app/shop/marketplace/[productId]/
page.tsx. Follow the state flow in ARCHITECTURE.md section 5 exactly: default
to the first in-stock variant, refetch EMI plans on variant change, reset the
selected plan on variant change, and disable ProceedCTA until both a variant
and an EMI plan are selected. On CTA click, show a simple confirmation state
in-page (no real checkout) — a summary of product + variant + chosen plan.
```

## Stage 7 — Responsiveness + polish pass

```
Review every screen at 375px (mobile), 768px (tablet), and 1280px (desktop)
widths. Fix any layout breaks. Confirm loading/error/empty states are wired
on every async screen per ARCHITECTURE.md section 6. Don't add new features
in this pass — only fix what's broken or inconsistent.
```

## Stage 8 — README for submission

```
Write README.md for this repo: setup instructions (npm install, npm run dev),
a short architecture summary, what's mocked vs. real (API layer, EMI
calculation, no real payment backend), and the assumptions listed in
PROJECT.md section 6 stated explicitly and honestly. Keep it concise — a
reviewer should be able to read it in two minutes and know exactly what
they're looking at.
```

---

## Notes on using these prompts

- Run stages in order — later stages assume earlier files exist.
- If the assistant invents a design detail not in SKILL.md (a spacing value,
  an icon), that's fine — it's explicitly documented as a "reasonable default,"
  not something to correct unless it actively looks inconsistent.
- After Stage 6, actually click through the flow yourself before Stage 7.
  Prompting a polish pass on a broken flow wastes the pass.
