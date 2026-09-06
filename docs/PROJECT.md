# PROJECT.md — 1Fi Marketplace (SDE Intern Assignment)

## 1. What this is

A take-home assignment for the 1Fi SDE Intern role. The task: add a **1Fi Marketplace**
section to the existing Shop page of the 1Fi app, alongside two placeholder tabs
(Top Brands, Nearby Stores) that require no implementation.

Submission deadline: **8th September 2026**, via the provided Google Form, with a
GitHub repo link.

## 2. Goal

Build a standalone, deployable reference implementation that:

- Recreates the Shop page's tab structure (Top Brands / Nearby Stores / 1Fi Marketplace)
- Fully implements the Marketplace: product browsing, variants, EMI plan selection, CTA
- Visually and structurally resembles the real 1Fi app (see `SKILL.md` for confirmed
  design facts and conventions)
- Demonstrates production-quality engineering: typed data layer, mock API, loading/error
  states, reusable components — not just a static mockup

This is **not** a request to redesign 1Fi or touch Top Brands / Nearby Stores beyond
stub tabs.

## 3. Scope

### In scope
- Shop page shell with 3 tabs
- 1Fi Marketplace tab:
  - Product listing (grid/list of products with image, name, price, "from ₹X/mo")
  - Product detail view: images, variants (storage/color), full pricing
  - EMI plan selector (tenure options, monthly amount per tenure)
  - CTA to proceed with selected plan (can terminate at a confirmation state —
    no real payment/checkout backend expected)
  - Loading, error, and empty states throughout
- Mock API layer (Next.js API routes) serving product + EMI data from a JSON source
- Responsive layout (mobile-first, since 1Fi is primarily a mobile app experience)

### Out of scope
- Top Brands / Nearby Stores implementation (stay blank per brief)
- Real payment processing or backend integration
- Auth/login flows
- Actual mutual fund pledging / limit-checking logic (can be mocked as "eligible" —
  do not present as validated business logic)

## 4. Deliverables

1. GitHub repository with full source
2. Deployed link (Vercel recommended — free, fast, matches what similar public
   reference implementations for this exact assignment already use)
3. README covering: setup, architecture decisions, what's mocked vs real, and
   explicit assumptions made about 1Fi's design system (see `SKILL.md`)
4. This docs/ folder itself can be included in the repo as supporting rationale,
   or trimmed for submission — your call

## 5. Evaluation criteria → what satisfies it

| Criterion | How this project addresses it |
|---|---|
| Product understanding | SKILL.md documents confirmed 1Fi product facts (EMI-on-mutual-funds model, real Shop page structure) before any code was written |
| UI/UX consistency | Shared card/button/typography system; real brand color (`#712CDC`); existing bottom nav preserved |
| Engineering quality | Typed data models, mock API layer, reusable `ProductCard`/`EMIPlanCard`, no hardcoded UI data |
| Functionality | End-to-end flow: browse → select variant → select EMI plan → CTA confirmation |
| Data/API implementation | REST-style Next.js API routes, loading/error/empty states, clean fetch hooks |
| Attention to detail | Responsive layout, skeleton loaders, disabled states on incomplete selections |

## 6. Assumptions (state these explicitly in the submission README)

- Exact spacing scale, font family, and icon set are **reasonable defaults**, not
  verified from the real app (we only had page-content access, not full visual/CSS access)
- EMI interest is assumed 0% by default per 1Fi's public positioning, with tenure
  as the primary variable
- Product catalog (which phones, prices) is **mock data** — structured to be swapped
  for a real product API without touching UI components
- "Nearby Stores" and "Top Brands" are given empty tab shells only, per instructions
