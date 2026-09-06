# ARCHITECTURE.md — 1Fi Marketplace

## 1. Stack

- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: Tailwind CSS (fast to theme with 1Fi's `#712CDC`, easy to keep consistent)
- **State**: React local state + Context where selection needs to persist across
  the variant → EMI plan → CTA flow. No Redux — scope doesn't justify it.
- **Data**: Next.js API routes (`/app/api/...`) backed by static JSON, shaped like
  a real REST API so swapping in a real backend later means changing the fetch
  layer only, never the components.
- **Deployment**: Vercel

## 2. Folder structure

```
1fi-marketplace/
├── app/
│   ├── shop/
│   │   ├── page.tsx                    # Shop page shell: 3-tab layout
│   │   ├── top-brands/page.tsx         # stub, blank per brief
│   │   ├── nearby-stores/page.tsx      # stub, blank per brief
│   │   └── marketplace/
│   │       ├── page.tsx                # product listing
│   │       └── [productId]/page.tsx    # product detail + variant + EMI + CTA
│   └── api/
│       └── marketplace/
│           ├── products/route.ts             # GET list
│           ├── products/[id]/route.ts        # GET one product + variants
│           └── products/[id]/emi-plans/route.ts  # GET EMI plans for a product
├── components/
│   ├── shop/
│   │   ├── ShopTabs.tsx                # shared tab bar (Top Brands | Nearby Stores | Marketplace)
│   │   └── BottomNav.tsx               # Home / Shop / EMI Dues / Limit / Profile
│   ├── marketplace/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── VariantSelector.tsx
│   │   ├── EMIPlanCard.tsx
│   │   ├── EMIPlanSelector.tsx
│   │   └── ProceedCTA.tsx
│   └── ui/
│       ├── Skeleton.tsx
│       ├── ErrorState.tsx
│       ├── EmptyState.tsx
│       └── Button.tsx
├── lib/
│   ├── types.ts                        # Product, ProductVariant, EMIPlan
│   ├── data/products.json              # mock product catalog
│   └── hooks/
│       ├── useProducts.ts
│       ├── useProduct.ts
│       └── useEmiPlans.ts
├── docs/
│   ├── SKILL.md
│   ├── PROJECT.md
│   ├── ARCHITECTURE.md
│   └── PROMPT.md
└── README.md
```

## 3. Data models (`lib/types.ts`)

```typescript
export interface ProductVariant {
  id: string;
  label: string;        // e.g. "256GB · Titanium Black"
  priceInr: number;      // full price for this variant
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;          // e.g. "iPhone 16"
  brand: string;         // e.g. "Apple"
  images: string[];
  basePriceInr: number;  // lowest variant price, for listing display
  variants: ProductVariant[];
  description: string;
}

export interface EMIPlan {
  id: string;
  tenureMonths: number;      // 3–24 per 1Fi's real model
  monthlyAmountInr: number;
  interestRatePercent: number; // 0 for no-cost EMI plans
  totalPayableInr: number;
}
```

## 4. API contract

| Endpoint | Method | Returns |
|---|---|---|
| `/api/marketplace/products` | GET | `Product[]` (listing fields only) |
| `/api/marketplace/products/:id` | GET | `Product` (full, with variants) |
| `/api/marketplace/products/:id/emi-plans?variantId=` | GET | `EMIPlan[]` for that variant's price |

All routes return `{ data }` on success and `{ error: string }` with a non-200
status on failure, so the frontend has one consistent shape to branch on.

EMI plans are computed server-side from `priceInr ÷ tenureMonths` for 0%-interest
tenures — this demonstrates real data handling instead of a static lookup table,
while staying honest that it's a simplified mock, not real underwriting logic.

## 5. State flow (Marketplace product detail screen)

```
[Product loads] → selectedVariant defaults to first in-stock variant
                → EMI plans re-fetch whenever selectedVariant changes
                → selectedEmiPlan resets to null on variant change
                → ProceedCTA disabled until both variant + EMI plan are selected
                → CTA click → confirmation state (no real checkout backend)
```

Held in a single `useState`/`useReducer` at the page level, passed down —
no need for Context at this scope, but the shape is documented here so it's
a five-minute change if the flow grows.

## 6. Loading / error / empty state matrix

| Screen | Loading | Error | Empty |
|---|---|---|---|
| Marketplace listing | Skeleton grid (6 cards) | "Couldn't load products" + retry | "No products available right now" |
| Product detail | Skeleton detail layout | "Couldn't load this product" + retry | — |
| EMI plan selector | Skeleton plan rows | "Couldn't load EMI plans" + retry | "No EMI plans available for this variant" |

## 7. Why these choices

- **Next.js API routes over a separate backend**: matches the assignment's "mock
  APIs where backend isn't available" allowance while still exercising real
  request/response handling, not hardcoded props.
- **No Redux**: the assignment scores "state management" appropriateness, not
  library sophistication — a single-section feature with a short-lived selection
  flow doesn't need a global store, and reviewers who know the space will recognize
  reaching for Redux here as overengineering rather than skill.
- **Tailwind**: fastest path to reproducing a consistent design system with one
  source of truth for the brand color and spacing scale.
