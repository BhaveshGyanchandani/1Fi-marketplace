import type { ApiResult, Product } from '../types';
import productsJson from '../data/products.json';
import { computeEmiPlans } from './emiEngine';

// ---------------------------------------------------------------------------
// This file stands in for the Next.js API routes described in ARCHITECTURE.md
// (`/api/marketplace/products`, `/api/marketplace/products/:id`,
// `/api/marketplace/products/:id/emi-plans`). Vite is a pure client-side
// bundler with no server runtime, so there is nowhere to put an `app/api`
// route handler.
//
// Instead, this module exposes the exact same three operations, with the same
// { data } / { error } envelope and the same artificial network latency a
// real fetch would have. Hooks in lib/hooks/ call these functions instead of
// fetch() — swapping this file for real HTTP calls later means changing this
// file only, never the components or hooks that consume it.
// ---------------------------------------------------------------------------

const products = productsJson as Product[];

const NETWORK_DELAY_MS = 500;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS));
}

/** GET /api/marketplace/products */
export async function fetchProducts(): Promise<ApiResult<Product[]>> {
  try {
    return await delay({ data: products });
  } catch {
    return { error: 'Something went wrong while loading products.' };
  }
}

/** GET /api/marketplace/products/:id */
export async function fetchProductById(id: string): Promise<ApiResult<Product>> {
  const product = products.find((p) => p.id === id);
  if (!product) {
    return delay({ error: 'This product could not be found.' });
  }
  return delay({ data: product });
}

/** GET /api/marketplace/products/:id/emi-plans?variantId= */
export async function fetchEmiPlans(
  productId: string,
  variantId: string
): Promise<ApiResult<ReturnType<typeof computeEmiPlans>>> {
  const product = products.find((p) => p.id === productId);
  const variant = product?.variants.find((v) => v.id === variantId);

  if (!product || !variant) {
    return delay({ error: 'Could not load EMI plans for this selection.' });
  }

  const plans = computeEmiPlans(variant.priceInr);
  return delay({ data: plans });
}
